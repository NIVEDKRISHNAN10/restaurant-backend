const Food = require("../models/Food");

const seedFoods = async () => {
    const count = await Food.countDocuments();

    if (count === 0) {
        console.log("Seeding foods...");

        await Food.insertMany([
            { name: "Pizza", price: 10, category: "Food", quantity: 50 },
            { name: "Burger", price: 15, category: "Food", quantity: 30 },
            { name: "Pasta", price: 20, category: "Food", quantity: 20 },
            { name: "Salad", price: 5, category: "Food", quantity: 50 },
            { name: "Soup", price: 10, category: "Food", quantity: 30 },
            { name: "Sandwich", price: 15, category: "Food", quantity: 20 },
        ]);

        console.log("Foods seeded ✅");
    } else {
        console.log("Foods already exist ❌");
    }
};

module.exports = seedFoods;