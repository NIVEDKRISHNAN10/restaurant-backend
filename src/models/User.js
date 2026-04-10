const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
 password: {
  type: String,
  required: true,
  minlength: 8
},
  role: {
    type: Number,
    enum: [0,1],
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);