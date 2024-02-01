const SaveDetailsModel = require("../models/saveData");
exports.saveData = async (req, res) => {
  try {
    const {
      noOfPages,
      pageSizeFormat,
      grayOrColored,
      noOfCopies,
      pageSides,
      order_ID,
      payment_ID,
      amount,
    } = req.body;
    const docUrl = `${req.connection.encrypted ? "https" : "http"}://${
      req.headers.host
    }/${req.file.path}`;
    const savedData = new SaveDetailsModel({
      docUrl,
      noOfPages,
      pageSizeFormat,
      grayOrColored,
      noOfCopies,
      pageSides,
      order_id: order_ID,
      payment_id: payment_ID,
      amount,
      currentDate: new Date().toISOString().slice(0, 10),
    });

    await savedData.save();

    const printableData = {
      id: savedData._id,
      docUrl: savedData.docUrl,
      noOfPages: savedData.noOfPages,
      pageSizeFormat: savedData.pageSizeFormat,
      grayOrColored: savedData.grayOrColored,
      noOfCopies: savedData.noOfCopies,
      pageSides: savedData.pageSides,
      createdDate: savedData.currentDate,
      orderId: savedData.order_id,
      paymentId: savedData.payment_id,
      amount: savedData.amount,
    };

    return res.status(200).json({ data: printableData, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
