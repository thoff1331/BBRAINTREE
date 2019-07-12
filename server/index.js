require("dotenv").config();
let express = require("express");
let app = express();
var braintree = require("braintree");

app.use(express.json());
let {
  BT_ENVIROMENT,
  BT_MERCHANT_ID,
  BT_PUBLIC_KEY,
  BT_PRIVATE_KEY
} = process.env;

let gateway = braintree.connect({
  enviroment: BT_ENVIROMENT,
  mechantId: BT_MERCHANT_ID,
  publicKey: BT_PUBLIC_KEY,
  privateKey: BT_PRIVATE_KEY
});

gateway.clientToken.generate(
  {
    customerid: ""
  },
  function(err, response) {
    let clientToken = response.clientToken;
  }
);

app.post("/checkout", function(req, res) {
  let nonceFromTheClient = req.body.payment_method_nonce;
  // use payment method nonce here
});

gateway.transaction.sale(
  {
    amount: "10.00",
    paymentMethodNonce: nonceFromTheClient,
    options: {
      submitForSettlement: true
    }
  },
  function(err, result) {}
);
app.listen(3131, () => {
  console.log("Live on port 3131");
});
