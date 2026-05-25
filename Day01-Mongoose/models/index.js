const mongoose = require("mongoose");
const User = require("./user.models");

const connect = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bai01";
  await mongoose.connect(uri);
};

module.exports = {
  connect,
  User,
};
