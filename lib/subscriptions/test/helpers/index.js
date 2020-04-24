const MembershipApplication = require("../../models/membership_application");

exports.validApplication = new MembershipApplication({
  first: "Test",
  last: "User",
  email: "na@an.com",
  age: 31,
  height: 179,
  weight: 180
});
