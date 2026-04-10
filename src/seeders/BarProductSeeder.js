const Product = require("../models/Drinks");

const seedProducts = async () => {
  const count = await Product.countDocuments();

  if (count === 0) {
    console.log("Seeding products...");

    await Product.insertMany([
      { name: "Beer", price: 10, category: "Alcohol", "250ml": 100, "500ml": 50, "1L": 30 },
      { name: "Whiskey", price: 50, category: "Alcohol", "250ml": 50 ,"500ml": 30, "1L": 20 },
      { name: "Vodka", price: 40, category: "Alcohol", "250ml": 50, "500ml": 30, "1L": 20 },
      { name: "Coke", price: 5, category: "Soft Drink", "250ml": 100, "500ml": 50, "1L": 30 },
    ]);

    console.log("Products seeded ✅");
  } else {
    console.log("Products already exist ❌");
  }
};

module.exports = seedProducts;