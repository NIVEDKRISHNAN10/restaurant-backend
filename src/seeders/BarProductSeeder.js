const Product = require("../models/Drinks");

const seedProducts = async () => {
  const count = await Product.countDocuments();

  if (count === 0) {
    console.log("Seeding products...");

    await Product.insertMany([
      { name: "Beer", price: 10, category: "Alcohol", "volume":`'250ml'`,"quantity": 50, "pegs": 20 },
      { name :'Beer', price: 15, category: "Alcohol", "volume":`'500ml'`,"quantity": 30, "pegs": 15 },
      { name: "Beer", price: 20, category: "Alcohol", "volume":`'1L'`,"quantity": 20, "pegs": 10 },
      { name :' whiskey', price: 50, category: "Alcohol", "volume":`'250ml'`,"quantity": 50, "pegs": 20 },
      { name :' whiskey', price: 40, category: "Alcohol", "volume":`'500ml'`,"quantity": 30, "pegs": 15 },
      { name :' whiskey', price: 50, category: "Alcohol", "volume":`'1L'`,"quantity": 20, "pegs": 10 },
      { name: "Coke", price: 5, category: "Soft Drink", "volume":`'250ml'`,"quantity": 50 },
      { name: "Coke", price: 10, category: "Soft Drink", "volume":`'500ml'`,"quantity": 30 },
      { name: "Coke", price: 15, category: "Soft Drink", "volume":`'1L'`,"quantity": 20 },
    ]);

    console.log("Products seeded ✅");
  } else {
    console.log("Products already exist ❌");
  }
};

module.exports = seedProducts;