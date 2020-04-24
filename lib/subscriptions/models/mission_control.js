const moment = require("moment");
const assert = require("assert");
const Mission = require("./mission");

class MissionControl {
  constructor(args) {
    assert(args.db, "Needs a DB instance");
    this.db = args.db; //dependency injection for DB, so testing is easier
  }

  currentMission(next) {
    // the cuurent mission it the one that starts
    // the first of next month
    const nextMission = moment().add(1, "month").startOf("month");
    const formattedMissionDate = nextMission.format("DD.MM.YYYY");

    //pull from the DB
    this.db.getMissionByLaunchDate(formattedMissionDate, (err, foundMission) => {
      //no bubbling here, throw
      assert.ok(err === null, err);

      //if there's a saved mission, send it along...
      if (foundMission) {
        next(null, new Mission(foundMission));
      } else {
        //create it and save
        foundMission = new Mission();
        this.db.createNextMission(foundMission, (err, result) => {
          next(err, foundMission);
        });
      }
    });
  }

  hasSpaceForRole(role, next) {
    this.currentMission((err, mission) => {
      const hasRoom = mission.needsRole(role);
      next(null, hasRoom);
    });
  }

  assignRole(application, next) {
    const missionArgs = {
      role: application.role,
      user: {
        first: application.first,
        last: application.last,
        email: application.email
      }
    };

    this.currentMission((err, mission) => {
      mission.assignRole(missionArgs);
      this.db.update({ launchDate: mission.launchDate }, mission, {}, (err, res) => {
        next(null, mission);
      });
    });
  }
}

module.exports = MissionControl;
