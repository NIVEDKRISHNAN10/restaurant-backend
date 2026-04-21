const Order = require("../models/Order");
const BarOrder = require("../models/Drinks");
const Drinks = require("../models/Drinks");


exports.createOrderGet = async (req, res) => {
  try {
    const order = await Order.find();
    console.log(order);
    res.status(200).json({
      message: "Orders fetched successfully",
      order,
      pagination: {
        per_page: 25
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

exports.orderCreation = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ status: false, message: "the order is not found" });
  }
  try {
    const orderData = {
      tableNumber: req.body.tableNumber,
      items: req.body.items,
      status: "pending"
    }
    const order = new Order(orderData);
    await order.save();
    res.status(200).json({
      message: "Order created successfully",
      order
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    if(!req.body){
      return res.status(400).json({ status: false,message: "the order is not found" });
    }
    console.log(order);
    if(!req.body.drink_id){
      return res.status(400).json({ status: false,message: "The Item is not selected" });
    }
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

const reducePegs  = async (orderId) => {
  try {
    const Orders =  Order.findById(orderId);
    if(!Orders){
      return res.status(400).json({ status: false,message: "the order is not found" });
    }}
    catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
}
    