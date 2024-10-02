const jwt = require("jsonwebtoken");
const client = require("../configs/redis");
const User = require("../models/user");
const { createError } = require("../utils/error");

exports.verifyRefresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
    const userId = decoded.aud;
    const user = await User.findOne({ _id: userId });
    if (user) {
      req.user = user;
      next();
    }
  } catch (err) {
    return next(createError(400, "User not authenticated"));
  }
};

exports.verifyAccess = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    const userId = decoded.aud;
    const user = await User.findOne({ _id: userId });
    if (user) {
      req.user = user;
      next();
    }
  } catch (err) {
    return next(createError(400, "User not authenticated"));
  }
};
