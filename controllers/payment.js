const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

exports.payment = async (req, res) => {
  const { noOfPages, pageSizeFormat, grayOrColored, noOfCopies } = req.body;

  let amount = 0;
  if (noOfPages < 21) {
    if (pageSizeFormat === "A3") {
      amount = grayOrColored === "Grayscale" ? 10 : 35;
    } else if (pageSizeFormat === "A4") {
      amount = grayOrColored === "Grayscale" ? 3 : 10;
    }
  } else if (noOfPages < 100) {
    if (pageSizeFormat === "A3") {
      amount = grayOrColored === "Grayscale" ? 7 : 28;
    } else if (pageSizeFormat === "A4") {
      amount = grayOrColored === "Grayscale" ? 2 : 8;
    }
  } else {
    if (pageSizeFormat === "A3") {
      amount = grayOrColored === "Grayscale" ? 5 : 20;
    } else if (pageSizeFormat === "A4") {
      amount = grayOrColored === "Grayscale" ? 1 : 7;
    }
  }

  amount = amount * noOfPages * noOfCopies + 2;

  const options = {
    amount: amount * 100,
    currency: "INR",
  };

  razorpayInstance.orders.create(options, (err, order) => {
    if (!err) {
      return res.json({
        order: {
          ...order,
          Key_Id: process.env.RAZORPAY_KEY_ID,
        },
        success: true,
      });
    } else {
      return res.send(err);
    }
  });
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const resultSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature == resultSign) {
      return res.status(200).json({
        success: true,
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        amount: amount / 100,
        message: "Payment verified successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
