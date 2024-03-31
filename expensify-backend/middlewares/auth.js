const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

async function isAuthenticated(req, res, next) {
  try {
    const authToken = req.header("auth-token");
    if (!authToken) {
      return res.status(401).json({
        err: "You must be logged in",
      });
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRETE);
    const user = await UserModel.findOne({ _id: decoded.user._id });

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
}

module.exports = isAuthenticated;
