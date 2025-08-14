const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true }, //  new
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },     // new
  password: { type: String, required: true },
  role: { type: String, default: "user" } // 'user' or 'admin'
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
