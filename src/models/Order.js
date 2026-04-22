const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  tableNumber: Number,
  items: [
    {
      product_id: String,
      name: String,
      price: Number,
      volume: {type: String , required: false,},
      quantity: Number,
      pegs : { type : Number, required: false, },
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