const Billing = require("./processes/billing");
const billing = new Billing({ stripeKey: "sk_test_tkkJ3huLjLxQG3O2cALRTMEs" });

billing.createSubscription(
  {
    source: "tok_chargeDeclined",
    name: "NA AN",
    plan: "commander",
    email: "na@an.com"
  },
  function(err, customer) {
    // asynchronously called
    console.log(err);
    console.log(customer);
  }
);
