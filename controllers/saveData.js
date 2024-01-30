const SaveDataModel = require("../models/saveData");
const PaymentModel = require("../models/payment");
exports.saveData = async (req, res) => {
  try {
    const {
      noOfPages,
      pageSizeFormat,
      grayOrColored,
      noOfCopies,
      pageSides,
      paymentDocsId,
    } = req.body;
    console.log(req.body);
    const docUrl = `${req.connection.encrypted ? "https" : "http"}://${
      req.headers.host
    }/${req.file.path}`;

    const savedData = new SaveDataModel({
      docUrl,
      noOfPages,
      pageSizeFormat,
      grayOrColored,
      noOfCopies,
      pageSides,
      paymentDocsId,
    });

    await savedData.save();

    const paymentData = await PaymentModel.findById(savedData.paymentDocsId);

    const printableData = {
      id: savedData._id,
      docUrl: savedData.docUrl,
      noOfPages: savedData.noOfPages,
      pageSizeFormat: savedData.pageSizeFormat,
      grayOrColored: savedData.grayOrColored,
      noOfCopies: savedData.noOfCopies,
      pageSides: savedData.pageSides,
      createdAt: savedData.createdAt,
      orderId: paymentData.order_id,
      paymentId: paymentData.payment_id,
      amount: paymentData.amount,
    };

    return res.status(200).json({ data: printableData, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
