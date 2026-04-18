const mongoose = require ('mongoose');
const PegsRatioSchema = new mongoose.Schema({
    volume : String,
    pegs : Number


});

module.exports = mongoose.model("PegsRatio", PegsRatioSchema);