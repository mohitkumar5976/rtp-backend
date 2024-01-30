const mongoose = require("mongoose");

const saveDataSchema = new mongoose.Schema(
  {
    docUrl: String,
    noOfPages: Number,
    pageSizeFormat: String,
    grayOrColored: String,
    noOfCopies: Number,
    pageSides: String,
    paymentDocsId: {
      type: mongoose.Types.ObjectId,
      ref: "PaymentModel",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SaveDataModel", saveDataSchema);
