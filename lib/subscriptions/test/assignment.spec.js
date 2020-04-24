const assert = require("assert");
const _ = require("underscore")._;
const Assignment = require("../models/assignment");
const Mission = require("../models/mission");
const goodSpecs = { age: 40, height: 180, weight: 90 };

describe("Assignments", () => {
  describe("Commander with valid app", () => {
    let assignment;

    before(() => {
      assignment = new Assignment({
        passenger: goodSpecs,
        mission: new Mission({ id: 1000 }),
        role: "commander"
      });
    });

    it("compatible", () => {
      assert(assignment.passengerIsCompatible());
    });
  });

  describe("Commander is overweight", () => {
    let assignment;
    before(() => {
      assignment = new Assignment({
        passenger: { ...goodSpecs, weight: 200 },
        mission: new Mission({ id: 1000 }),
        role: "commander"
      });
    });

    it("not compatible", () => {
      assert(!assignment.passengerIsCompatible());
    });
  });

  describe("Commander is too tall", () => {
    let assignment;
    before(() => {
      assignment = new Assignment({
        passenger: { ...goodSpecs, height: 220 },
        mission: new Mission({ id: 1000 }),
        role: "commander"
      });
    });

    it("not compatible", () => {
      assert(!assignment.passengerIsCompatible());
    });
  });

  describe("Passenger availability - empty mission", () => {
    let assignment;
    before(() => {
      assignment = new Assignment({
        passenger: goodSpecs,
        mission: new Mission({ id: 1000 }),
        role: "space-tourist"
      });
    });

    it("available with no passangers", () => {
      assert(assignment.passengerIsCompatible());
    });
  });

  describe("Passenger availability - full mission", () => {
    let assignment;
    before(() => {
      assignment = new Assignment({
        passenger: goodSpecs,
        mission: new Mission({
          id: 1000,
          colonists: new Array(4),
          tourists: new Array(4)
        }),
        role: "space-tourist"
      });
    });
    it("not open", () => {
      assert(!assignment.passengerIsCompatible());
    });
  });
  describe("Passenger availability - heavy mission", () => {
    let assignment;
    before(() => {
      var heavyColonists = [];
      var heavyTourists = [];
      for (var i = 0; i <= 4; i++) {
        //6 * 250 == 2500
        heavyColonists.push({ weight: 200 });
        heavyTourists.push({ weight: 200 });
      }
      assignment = new Assignment({
        passenger: goodSpecs,
        mission: new Mission({
          id: 1000,
          colonists: heavyColonists,
          tourists: heavyTourists
        }),
        role: "space-tourist"
      });
    });
    it("not open", () => {
      assert(!assignment.passengerIsCompatible());
    });
  });
});
