const assert = require("assert");
const sinon = require("sinon");
const ReviewProcess = require("../processes/review");
const Helpers = require("./helpers");

describe("The Review Process", () => {
  describe("Receiving a valid application", () => {
    let decision, review, db;
    const validApp = Helpers.validApplication;

    before(done => {
      db = Helpers.stubDb();
      sinon.stub(db, "saveAssignment").yields(null, { saved: true });

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
    it("returns an assignment", () => {
      assert(decision.assignment);
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
