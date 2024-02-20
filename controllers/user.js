const User = require("../models/userModel");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.json({ status: 404, message: "User doesn't exist" });
    }

    if (user.password !== password) {
      return res.json({ status: 404, message: "Password doesn't match" });
    }

    const userData = {
      _id: user._id,
      email: user.email,
    };

    return res.json({ userData, status: 200, message: "login successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.checkShopId = async (req, res) => {
  try {
    const { shopId } = req.body;

    let shopkeeperId = await User.findOne({ shopId });

    if (!shopkeeperId) {
      return res.json({ status: "404", message: "ShopId doesn't exist" });
    }

    return res.json({ status: "200", message: "ShopId Exists" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
