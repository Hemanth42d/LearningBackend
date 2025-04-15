const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/loginPractice").then(() => {
  console.log("Db connected");
});

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
