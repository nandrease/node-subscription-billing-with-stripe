const sinon = require("sinon");
const MembershipApplication = require("../../models/membership_application");
const Mission = require("../../models/mission");
const DB = require("../../db");

exports.validApplication = () =>
  new MembershipApplication({
    first: "Test",
    last: "User",
    email: "na@an.com",
    age: 31,
    height: 179,
    weight: 80,
    role: "commander",
    source: "tok_mastercard"
  });

exports.stubDb = args => {
  args || (args = {});
  const mission = args.mission || new Mission();
  const db = new DB();
  sinon.stub(db, "getMissionByLaunchDate").yields(null, null);
  sinon.stub(db, "createNextMission").yields(null, mission);
  return db;
};

exports.goodStripeArgs = () => ({
  source: "tok_mastercard",
  description: "Test Customer Name",
  plan: "commander",
  email: "na@an.com"
});

exports.badStripeArgs = () => ({
  source: "tok_chargeDeclined",
  description: "Test Customer Name",
  plan: "commander",
  email: "na2@an.com"
});

exports.goodStripeResponse = args => {
  args || (args = {});
  const plan = args.plan || "commander";

  return {
    id: "cus_HASY5JMwWvGL8s",
    object: plan,
    account_balance: 0,
    address: null,
    balance: 0,
    created: 1587896573,
    currency: "eur",
    default_source: "card_1Gc7dRCpWtQ7HzHOr5KOzKKA",
    delinquent: false,
    description: "My First Test Customer (created for API docs)",
    discount: null,
    email: "na@an.com",
    invoice_prefix: "71EBA5AC",
    invoice_settings: {
      custom_fields: null,
      default_payment_method: null,
      footer: null
    },
    livemode: false,
    metadata: {},
    name: null,
    next_invoice_sequence: 2,
    phone: null,
    preferred_locales: [],
    shipping: null,
    sources: {
      object: "list",
      data: [ [ Object ] ],
      has_more: false,
      total_count: 1,
      url: "/v1/customers/cus_HASY5JMwWvGL8s/sources"
    },
    subscriptions: {
      object: "list",
      data: [ [ Object ] ],
      has_more: false,
      total_count: 1,
      url: "/v1/customers/cus_HASY5JMwWvGL8s/subscriptions"
    },
    tax_exempt: "none",
    tax_ids: {
      object: "list",
      data: [],
      has_more: false,
      total_count: 0,
      url: "/v1/customers/cus_HASY5JMwWvGL8s/tax_ids"
    },
    tax_info: null,
    tax_info_verification: null
  };
};

exports.badStripeResponse = () => ({
  rawType: "card_error",
  code: "card_declined",
  param: undefined,
  message: "Your card was declined.",
  detail: undefined,
  raw: {
    message: "Your card was declined.",
    type: "card_error",
    code: "card_declined",
    decline_code: "generic_decline"
  },
  error: "Your card was declined",
  type: "StripeCardError"
});
