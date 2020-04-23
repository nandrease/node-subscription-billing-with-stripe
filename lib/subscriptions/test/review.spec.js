const assert = require("assert");
const sinon = require("sinon");
const ReviewProcess = require("../processes/review");
const MembershipApplication = require("../models/membership_application");

describe("The Review Process", () => {
  describe("Receiving a valid application", () => {
    let decision;
    const validApp = new MembershipApplication({
      first: "Test",
      last: "User",
      email: "na@an.com",
      age: 31,
      height: 179,
      weight: 180
    });

    const review = new ReviewProcess({ application: validApp });
    sinon.spy(review, "ensureAppIsValid");
    sinon.spy(review, "findNextMission");
    sinon.spy(review, "roleIsAvailable");
    sinon.spy(review, "ensureRoleCompatible");

    before(function(done) {
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
