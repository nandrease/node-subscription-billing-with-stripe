const assert = require("assert");
const sinon = require("sinon");
const ReviewProcess = require("../processes/review");
const Mission = require("../models/mission");
const Helpers = require("./helpers");
const DB = require("../db");

describe("The Review Process", () => {
  describe("Receiving a valid application", () => {
    let decision, review, db;
    const validApp = Helpers.validApplication;

    before(done => {
      db = Helpers.stubDb();

      review = new ReviewProcess({ application: validApp, db });
      sinon.spy(review, "ensureAppIsValid");
      sinon.spy(review, "findNextMission");
      sinon.spy(review, "roleIsAvailable");
      sinon.spy(review, "ensureRoleCompatible");

      review.processApplication(function(err, result) {
        decision = result;
        done();
      });
    });

    it("returns success", () => {
      assert(decision.success, decision.message);
    });
    it("ensures the application is valid", () => {
      assert(review.ensureAppIsValid.called);
    });
    it("selects a mission", () => {
      assert(review.findNextMission.called);
    });
    it("ensures a role exists", () => {
      assert(review.roleIsAvailable.called);
    });
    it("ensures role compatibility", () => {
      assert(review.ensureRoleCompatible.called);
    });
  });
});
