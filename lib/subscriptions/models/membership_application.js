const _ = require("underscore")._;
const moment = require("moment");

class MembershipApplication {
  constructor(args) {
    args || (args = {});

    // extend all properties and methods on args
    // and add them to this.
    _.extend(this, args);

    this.validUntil = args.validUntil ? moment(args.validUntil) : moment().add(10, "days");
  }

  expired() {
    return this.validUntil.isBefore(moment());
  }

  nameIsValid() {
    return this.first && this.last && this.first.length > 1 && this.last.length > 1;
  }

  emailIsValid() {
    return this.email && this.email.length > 3 && this.email.indexOf("@") > -1;
  }

  ageIsValid() {
    return this.age && this.age > 15 && this.age < 100;
  }

  weightIsValid() {
    return this.weight && this.weight > 45 && this.weight < 200;
  }

  heightIsValid() {
    return this.height && this.height > 120 && this.height < 220;
  }

  validationMessage() {
    if (this.isValid()) return "Application is valid";
    else if (!this.nameIsValid()) return "Name is invalid";
    else if (!this.emailIsValid()) return "Email is invalid";
    else if (!this.ageIsValid()) return "Age is invalid";
    else if (!this.heightIsValid()) return "Height is invalid";
    else if (!this.weightIsValid()) return "Weight is invalid";
    else if (this.expired()) return "This application is expireds";
  }

  isValid() {
    return (
      this.nameIsValid() &&
      this.emailIsValid() &&
      this.ageIsValid() &&
      this.heightIsValid() &&
      this.heightIsValid() &&
      !this.expired()
    );
  }
}

module.exports = MembershipApplication;
