const SaveDetailsModel = require("../models/saveData");
exports.saveData = async (req, res) => {
  try {
    const {
      phoneNo,
      noOfPages,
      pageSizeFormat,
      grayOrColored,
      noOfCopies,
      pageSides,
      order_ID,
      payment_ID,
      amount,
    } = req.body;
    const docUrl = `https://${
      req.headers.host
    }/${req.file.path}`;
    const savedData = new SaveDetailsModel({
      docUrl,
      phoneNo,
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
      phoneNo: savedData.phoneNo,
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

    return res.status(200).json({ printableData, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
