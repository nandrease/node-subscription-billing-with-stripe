const assert = require("assert");

class Billing {
  constructor({ stripeKey }) {
    assert(stripeKey, "Need a stripe key");

    this.stripe = require("stripe")(stripeKey);
  }

  createSubscription({ email, name, plan, source }, next) {
    assert({ email, name, plan, source });
    this.stripe.customers.create(
      {
        source,
        description: name,
        plan,
        email
      },
      next
    );
  }

  cancelSubscription(args, next) {
    // TODO: Need a payment info on app
    // return a subscription
  }

  changeSubscription(args, next) {}
}

module.exports = Billing;
