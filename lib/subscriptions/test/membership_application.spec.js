const assert = require("assert");
const MembershipApplication = require("../membership_application");

describe("Membership application requirements", () => {
  let validApp;

  beforeEach(() => {
    //arrange the data here
    validApp = new MembershipApplication({
      first: "Test",
      last: "User",
      email: "na@an.com",
      age: 31,
      height: 179,
      weight: 180
    });
  });
  describe("Validates successful if...", () => {
    it("all validators successful", () => {
      assert(validApp.isValid(), "Not valid");
    });
  });

  describe("Application invalid if...", () => {
    it("is expired", () => {
      const app = new MembershipApplication({ validUntil: Date.parse("09/08/1987") });
      assert(app.expired());
    });

    it("email is 4 characters or less", () => {
      const app = new MembershipApplication({ email: "n@a" });
      assert(!app.emailIsValid());
    });
    it("email is missing an @ symbol", () => {
      const app = new MembershipApplication({ email: "na_a.com" });
      assert(!app.emailIsValid());
    });
    it("email is omitted", () => {
      const app = new MembershipApplication();
      assert(!app.emailIsValid());
    });

    it("age is less than 15", () => {
      const app = new MembershipApplication({ age: 15 });
      assert(!app.ageIsValid());
    });
    it("age is more than 100", () => {
      const app = new MembershipApplication({ age: 100 });
      assert(!app.ageIsValid());
    });
    it("age is negative", () => {
      const app = new MembershipApplication({ age: -25 });
      assert(!app.ageIsValid());
    });
    it("age is omitted", () => {
      const app = new MembershipApplication();
      assert(!app.ageIsValid());
    });

    it("height is less than 120", () => {
      const app = new MembershipApplication({ height: 119 });
      assert(!app.heightIsValid());
    });
    it("height is more than 220", () => {
      const app = new MembershipApplication({ height: 225 });
      assert(!app.heightIsValid());
    });
    it("height is negative", () => {
      const app = new MembershipApplication({ height: -125 });
      assert(!app.heightIsValid());
    });
    it("height is omitted", () => {
      const app = new MembershipApplication();
      assert(!app.heightIsValid());
    });
    it("weight is less or equal to 45", () => {
      const app = new MembershipApplication({ weight: 45 });
      assert(!app.weightIsValid());
    });
    it("weight is more or equal to 200", () => {
      const app = new MembershipApplication({ weight: 200 });
      assert(!app.weightIsValid());
    });
    it("weight is negative", () => {
      const app = new MembershipApplication({ weight: -5 });
      assert(!app.weightIsValid());
    });
    it("weight is omitted", () => {
      const app = new MembershipApplication();
      assert(!app.weightIsValid());
    });
  });
});
