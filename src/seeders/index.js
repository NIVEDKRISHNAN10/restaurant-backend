const seedUsers = require("./UserSeeder");
const seedProducts = require("./BarProductSeeder");
const seedPegs = require("./PegsRatioSeeder");
const FoodSeeder = require("./FoodSeeder");

const runSeeders = async () => {
  await seedUsers();
  await seedProducts();
  await seedPegs();
  await FoodSeeder();
};

module.exports = runSeeders;