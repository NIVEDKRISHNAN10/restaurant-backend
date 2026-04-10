const express = require("express");
const router = express.Router();
const {  BarProductsOrder } = require("../controllers/userController");

router.get("/BarProductsOrder", BarProductsOrder);
router.post("/login", login);

module.exports = router;