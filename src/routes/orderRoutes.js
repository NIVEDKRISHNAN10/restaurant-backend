const express = require("express");
const router = express.Router();
const { createOrderGet,createOrder } = require("../controllers/orderController");
console.log("orderRoutes");
router.get("/create-order", createOrderGet);
router.post("/create-order", createOrder);

module.exports = router;