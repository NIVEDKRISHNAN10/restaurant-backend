const mongoose = require("mongoose");

const orderItemsSchema = new mongoose.Schema({
    order_id: String,
    product_id: String,
    name: String,
    price: Number,
    volume: String,
    quantity: Number,
    pegs : { type : Number, required: false, },
    type: { type: String, enum: ["food", "bar"] }
});

module.exports = mongoose.model("OrderItems", orderItemsSchema);