const moment = require("moment");
const assert = require("assert");
const _ = require("underscore")._;

class Mission {
  constructor(args) {
    args = args || {};

    this.mission = {
      status: "open", //open, closed, cancelled
      commander: args.Commander || null,
      MAVpilot: args.MAVpilot || null,
      colonists: args.colonists || [],
      tourists: args.tourists || [],
      assignments: [],
      // default to next month on the first
      launchDate: args.launchDate || moment().add(1, "month").startOf("month").format("DD.MM.YYYY")
    };
  }

  passengers() {
    return this.mission.colonists.length + this.mission.tourists.length || [];
  }

  passengersAndCrew() {
    return this.passengers().length + 2;
  }

  hasRoom() {
    return this.passengersAndCrew() < 10;
  }

  totalWeight() {
    var weight = 0;
    _.each(this.mission.assignments, function(assignment) {
      weight += assignment.passenger.weight;
    });
    return weight;
  }

  needsRole(role) {
    let needed = false;
    if (!this.isFlying()) {
      return false;
    }
    switch (role) {
      case "mission-commander":
        needed = !this.commander;
        break;
      case "mav-pilot":
        needed = !this.MAVpilot;
        break;
      case "colonist":
        needed = this.colonists.length <= 10;
        break;
      case "space-tourist":
        needed = this.tourists.length <= 20;
        break;
    }
    return needed;
  }

  assignRole({ role, user }) {
    assert.ok(user && role, "Need a user and role in order to assign");

    switch (role) {
      case "mission-commander":
        this.commander = user;
        break;
      case "mav-pilot":
        this.MAVpilot = user;
        break;
      case "colonist":
        this.colonists.push(user);
        break;
      case "space-tourist":
        tourists.length.push(user);
        break;
    }
    return this;
  }

  isFlying() {
    return this.status === "open";
  }
}

module.exports = Mission;
