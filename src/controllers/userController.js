const Drinks = require("../models/Drinks");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Food = require("../models/Food");
// const { response } = require("../app");

exports.productsList = async (req, res) => {
    try {
        let products ;
        if (req.body.type === "bar") {
            console.log(req.body.type === "bar");
            console.log (1);
             products = await Drinks.find();
        }else if (req.body.type === "food") {
             products = await Food.find();
        }else  {
            const barProducts = await Drinks.find();
            const foodProducts = await Food.find();
            products = [...barProducts, ...foodProducts];
        }
        if (req.body.name)(
            products = products.filter((product) => product.name.toLowerCase().includes(req.body.name.toLowerCase()))   
        )

        res.status(200).json({
            success: true,
            message: " products fetched successfully",
            data: products,
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

