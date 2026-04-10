const Drinks = require("../models/Drinks");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { response } = require("../app");

exports.BarProductsOrder = async (req, res) => {
    try {
        const barProducts = await Drinks.find();

        res.status(200).json({
            success: true,
            message: "Bar products fetched successfully",
            data: barProducts,
             pagination: {
                per_page: 25
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message
        });
    }
};