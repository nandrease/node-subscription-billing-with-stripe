const _ = require("underscore")._;

class MembershipApplication {
  constructor(args) {
    // extend all properties and methods on args
    // and add them to this.
    _.extend(this, args);
  }
  //   constructor({ first, last, email, age, height, weight }) {
  //     this.first = first;
  //     this.last = last;
  //     this.email = email;
  //     this.age = age;
  //     this.height = height;
  //     this.weight = weight;
  //   }

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

  isValid() {
    return this.nameIsValid() && this.emailIsValid() && this.ageIsValid() && this.heightIsValid() && this.heightIsValid();
  }
}

module.exports = MembershipApplication;
