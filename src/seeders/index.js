const seedUsers = require("./UserSeeder");
const seedProducts = require("./BarProductSeeder");
const seedPegs = require("./PegsRatioSeeder");

const runSeeders = async () => {
  await seedUsers();
  await seedProducts();
  await seedPegs();
};

module.exports = runSeeders;