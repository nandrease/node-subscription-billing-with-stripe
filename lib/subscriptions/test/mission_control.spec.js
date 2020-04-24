const moment = require("moment");
const assert = require("assert");
const sinon = require("sinon");
const MissionControl = require("../models/mission_control");
const db = require("../db");

sinon.stub(db, "find").yields(null, { id: 1 });
const missionControl = new MissionControl({ db });

describe("Mission Control", () => {
  describe("The Current Mission", () => {
    let currentMission;

    before(done => {
      missionControl.currentMission((err, res) => {
        currentMission = res;
        done();
      });
    });

    it("is created if none exists", () => {
      assert(currentMission);
    });
  });
});
