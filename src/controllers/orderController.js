const Order = require("../models/Order");
const BarOrder = require("../models/Drinks");
const Drinks = require("../models/Drinks");

exports.createOrder = async (req, res) => {
  try {
    console.log("create order");
    const order = new Order(req.body);
    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.createBarOrder = async (req, res) => {
  try {
    const barOrder = new BarOrder(req.body);
    const Drinks = req.body;
    const BarOrderId = BarOrder.id;
    if (!Drinks.product_id==BarOrderId){
      return res.status(400).json({ status: false,message: "the product is not found" });
    }
    const Litre = Drinks.litre;
    if (!(Drinks.quantity >= BarOrder.Litre)){
      return res.status(400).json({ status: false,message: "the quantity is not enough" });
    }
    await Drinks.updateOne({
      $inc: { quantity: -Litre }
    })

    await barOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      barOrder
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};