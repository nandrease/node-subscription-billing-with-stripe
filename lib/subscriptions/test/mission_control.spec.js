const moment = require("moment");
const assert = require("assert");
const sinon = require("sinon");
const MissionControl = require("../models/mission_control");
const Mission = require("../models/mission");
const db = require("../db");

describe("Mission Planning", () => {
  let missionControl;
  before(() => {
    sinon.stub(db, "getMissionByLaunchDate").yields(null, null);
    sinon.stub(db, "createNextMission").yields(null, new Mission());
    missionControl = new MissionControl({ db });
  });

  describe("No Current Mission", () => {
    let currentMission;
    
    before(done => {
      missionControl.currentMission((err, res) => {
        currentMission = res;
        done();
      });
    });

    it("is created if none exists", () => {
      assert(currentMission);
      assert(db.getMissionByLaunchDate.called);
    });
  });

  describe("Current Mission Exists", () => {
    let currentMission;

    before(done => {
      db.getMissionByLaunchDate.restore();
      sinon.stub(db, "getMissionByLaunchDate").yields(null, { id: 1000 });
      missionControl.currentMission((err, res) => {
        currentMission = res;
        done();
      });
    });

    it("it returns a mission with an id 1000", () => {
      assert(currentMission);
      assert(db.getMissionByLaunchDate.called);
    });
  });
});
