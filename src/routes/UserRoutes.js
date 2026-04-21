const express = require("express");
const router = express.Router();
const { productsList  } = require("../controllers/userController");
const { orderCreation } = require("../controllers/orderController");

router.get("/products-list", productsList);
router.post("/order-creation", orderCreation);
// router.post("/login", login);

module.exports = router;