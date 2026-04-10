const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  tableNumber: Number,
  items: [
    {
      name: String,
      quantity: Number,
      type: { type: String, enum: ["food", "bar"] }
    }
  ],
  status: {
    type: String,
    enum: ["pending", "preparing", "ready", "served"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);