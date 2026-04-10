const seedUsers = require("./UserSeeder");
const seedProducts = require("./BarProductSeeder");

const runSeeders = async () => {
  await seedUsers();
  await seedProducts();
};

module.exports = runSeeders;