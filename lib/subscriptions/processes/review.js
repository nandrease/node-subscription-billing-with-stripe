const async = require("async");
const assert = require("assert");
const MissionControl = require("../models/mission_control");
const db = require("../db");

class ReviewProcess {
  constructor({ application }) {
    assert(application, "Need an application to review");
    assert(db, "Needs a database instance");

    this.app = application;
    const missionControl = new MissionControl({ db });
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
    this.app.mission = {
      commander: null,
      pilot: null,
      passengers: []
    };
    next(null, true);
  }

  // make sure role selected is available
  roleIsAvailable(next) {
    //TODO
    next(null, true);
  }

  // make sure height/weight/age is reight for role
  ensureRoleCompatible(next) {
    //TODO
    next(null, true);
  }

  approveApplication(next) {
    //TODO
    next(null, true);
  }

  processApplication(next) {
    async.series(
      {
        validated: this.ensureAppIsValid.bind(this),
        mission: this.findNextMission.bind(this),
        roleAvailable: this.roleIsAvailable.bind(this),
        roleCompatible: this.ensureRoleCompatible.bind(this),
        success: this.approveApplication.bind(this)
      },
      (err, result) => {
        if (err) {
          next(null, {
            success: false,
            message: err
          });
        } else {
          result.message = "Welcome to Mars!";
          next(null, result);
        }
      }
    );
  }
}

module.exports = ReviewProcess;
