const sinon = require("sinon");
const MembershipApplication = require("../../models/membership_application");
const Mission = require("../../models/mission");
const DB = require("../../db");

exports.validApplication = new MembershipApplication({
  first: "Test",
  last: "User",
  email: "na@an.com",
  age: 31,
  height: 179,
  weight: 180
});

exports.stubDb = args => {
  args || (args = {});
  const mission = args.mission || new Mission();
  const db = new DB();
  sinon.stub(db, "getMissionByLaunchDate").yields(null, null);
  sinon.stub(db, "createNextMission").yields(null, mission);
  return db;
};
