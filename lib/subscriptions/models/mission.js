const moment = require("moment");
const assert = require("assert");

class Mission {
  constructor(args) {
    this.args = args || {};

    this.mission = {
      status: "open", //open, closed, cancelled
      commander: args.Commander || null,
      MAVpilot: args.MAVpilot || null,
      colonists: args.colonists || [],
      tourists: args.tourists || [],
      // default to next month on the first
      launchDate: args.launchDate || moment().add(1, "month").startOf("month").format("DD.MM.YYYY")
    };
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
