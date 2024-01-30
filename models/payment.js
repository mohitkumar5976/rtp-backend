const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
    },
    payment_id: {
      type: String,
    },
    amount: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PaymentModel", paymentSchema);
