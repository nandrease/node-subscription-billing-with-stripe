const assert = require("assert");
const sinon = require("sinon");
const nock = require("nock");
const ReviewProcess = require("../processes/review");
const Billing = require("../processes/billing");
const Helpers = require("./helpers");

describe("The Review Process", () => {
  const db = Helpers.stubDb();
  const billing = new Billing({ stripeKey: "xxx" });

  describe("Receiving a valid application", () => {
    let decision, review;
    const validApp = Helpers.validApplication();

    sinon.stub(db, "saveAssignment").yields(null, { saved: true });

    before(done => {
      const goodCall = nock("https://api.stripe.com/v1").post("/customers").reply(200, Helpers.goodStripeResponse);

      review = new ReviewProcess({ application: validApp, billing, db });

      sinon.spy(review, "ensureAppIsValid");
      sinon.spy(review, "findNextMission");
      sinon.spy(review, "roleIsAvailable");
      sinon.spy(review, "ensureRoleCompatible");
      sinon.spy(review, "startSubscripiton");

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
    it("returns a subscription", () => {
      assert(decision.subscription);
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

  describe("Valid application, failed billing", () => {
    let review,
      badBillingApp,
      decision = {};

    before((done) => {
      const badCall = nock("https://api.stripe.com/v1").post("/customers").reply(200, Helpers.badStripeResponse);

      badBillingApp = Helpers.validApplication();
      badBillingApp.source = "tok_chargeDeclined";
      review = new ReviewProcess({ application: badBillingApp, billing, db });

      review.processApplication(function(err, result) {
        decision = result;
        done();
      });
    });

    it("returns false for success", () => {
      assert(!decision.success);
    });
  });
});
