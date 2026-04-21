const mangoose=require("mongoose");

const foodSchema=new mangoose.Schema({
    name: String,
    price: Number,
    category: String,
    quantity: Number,

} ,{ timestamps: true });

module.exports = mangoose.model("Food", foodSchema);