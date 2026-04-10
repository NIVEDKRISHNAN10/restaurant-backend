const mangoose = require("mongoose");

const drinksSchema = new mangoose.Schema({
    name: String,
    price: Number,
    category: String,
    '250ml': Number,
    '500ml': Number,
    '1L': Number
} ,{ timestamps: true });

module.exports = mangoose.model("Drinks", drinksSchema);
