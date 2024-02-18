const mongoose = require("mongoose");

const saveDetailsSchema = new mongoose.Schema(
  {
    shopId:String,
    docUrl: String,
    phoneNo: String,
    noOfPages: Number,
    pageSizeFormat: String,
    grayOrColored: String,
    noOfCopies: Number,
    pageSides: String,
    order_id: String,
    payment_id: String,
    amount: String,
    currentDate: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SaveDetailsModel", saveDetailsSchema);
