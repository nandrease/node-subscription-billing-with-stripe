const assert = require("assert");
const _ = require("underscore")._;

class Assignment {
  constructor(args) {
    assert(args.passenger && args.role && args.mission, "Need a role, passenger and mission");

    _.extend(this, args);
  }

  passengerIsCompatible() {
    //each role has a specific height, age, and weight requirement
    var valid = false;
    if (this.role === "commander") {
      valid =
        this.passenger.age > 35 &&
        this.passenger.age < 75 &&
        this.passenger.weight < 200 &&
        this.passenger.height < 220;
    } else if (this.role === "mav-pilot") {
      //MAVs are small
      valid =
        this.passenger.age > 35 &&
        this.passenger.age < 55 &&
        this.passenger.weight < 100 &&
        this.passenger.height < 160;
    } else {
      //only 8 seats, cumulative weight has to be less than 1400 pounds
      valid =
        this.mission.hasRoom() &&
        this.mission.totalWeight() < 1400 &&
        this.passenger.age > 35 &&
        this.passenger.age < 55 &&
        this.passenger.weight < 200 &&
        this.passenger.height < 220;
    }
    return valid;
  }
}

module.exports = Assignment;
