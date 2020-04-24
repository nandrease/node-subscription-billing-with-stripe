const async = require("async");
const assert = require("assert");
const MissionControl = require("../models/mission_control");
const Assignment = require("../models/assignment");

class ReviewProcess {
  constructor({ application, db }) {
    assert(application, "Need an application to review");
    assert(db, "Needs a database instance");

    this.app = application;
    this.db = db;
    this.missionControl = new MissionControl({ db });
  }

  // make sure the app is valid
  ensureAppIsValid(next) {
    if (this.app.isValid()) {
      next(null, true);
    } else {
      next(this.app.validationMessage(), null);
    }
  }
  // find the next mission
  findNextMission(next) {
    //let's stub this thing out first
    this.missionControl.currentMission((err, res) => {
      if (err) {
        next(err, null);
      } else {
        this.mission = res;
        next(null, res);
      }
    });
  }

  // make sure role selected is available
  roleIsAvailable(next) {
    this.missionControl.hasSpaceForRole(this.app.role, next);
  }

  // make sure height/weight/age is reight for role
  ensureRoleCompatible(next) {
    this.assignment = new Assignment({
      passenger: this.app,
      role: this.app.role,
      mission: this.mission
    });

    //TODO: find out about roles and height/weight etc
    next(null, this.assignment.passengerIsCompatible());
  }

  approveApplication(next) {
    // send teh assignment to disk
    this.db.saveAssignment({ assignment: this.assignment }, next);
  }

  processApplication(next) {
    async.series(
      {
        validated: this.ensureAppIsValid.bind(this),
        mission: this.findNextMission.bind(this),
        roleAvailable: this.roleIsAvailable.bind(this),
        roleCompatible: this.ensureRoleCompatible.bind(this),
        assignment: this.approveApplication.bind(this)
      },
      (err, result) => {
        if (err) {
          next(null, {
            success: false,
            message: err
          });
        } else {
          result.success = true;
          result.message = "Welcome to Mars!";
          next(null, result);
        }
      }
    );
  }
}

module.exports = ReviewProcess;
