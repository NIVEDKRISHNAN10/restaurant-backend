const mangoose = require("mongoose");

const drinksSchema = new mangoose.Schema({
    name: String,
    price: Number,
    category: String,
    "volume": String,
    "quantity": Number,
    "pegs":{
        type: Number,
        required: false,
    }

} ,{ timestamps: true });

module.exports = mangoose.model("Drinks", drinksSchema);
