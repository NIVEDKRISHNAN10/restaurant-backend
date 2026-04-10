const Drinks = require("../models/Drinks");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require(".../app");

const BarProductsOrder = async (req, res) => {
    try {
        const barProducts = await Drinks.find({ category: "bar" });
        res.status(200).json(barProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};