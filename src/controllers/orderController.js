const Order = require("../models/Order");
const BarOrder = require("../models/Drinks");
const Drinks = require("../models/Drinks");
const OrderItem = require("../models/orderItems");
const printOrder = require("../utils/printOrder");


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
    return res.status(400).json({
      status: false,
      message: "Order data not found"
    });
  }

  try {
    const { tableNumber, items } = req.body;

    // 🔥 STEP 1: Save order (with full array)
    const order = await Order.create({
      tableNumber,
      items,
      status: "pending"
    });

    // 🔥 STEP 2: Convert items → separate docs
    const orderItemsData = items.map(item => ({
      order_id: order._id,
      product_id: item.product_id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      volume: item.volume,
      pegs: item.pegs,
      type: item.type
    }));

    // 🔥 STEP 3: Insert into OrderItem collection
    await OrderItem.insertMany(orderItemsData);

    // 🔥 STEP 4: (optional) print preview
    await printOrder(order, true);

    res.status(200).json({
      success: true,
      message: "Order + items stored successfully",
      orderId: order._id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};
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
    