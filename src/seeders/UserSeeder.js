const User = require("../models/User");
const bcrypt = require("bcrypt");

const seedUsers = async () => {
  const count = await User.countDocuments();

  if (count === 0) {
    console.log("Seeding users...");

    const password = await bcrypt.hash("password123", 10);

    await User.insertMany([
      {
        name: "Admin",
        email: "admin@test.com",
        password,
        role: 1 // admin
      },
      {
        name: "Waiter 1",
        email: "waiter1@test.com",
        password,
        role: 0 // worker
      },
      {
        name: "Waiter 2",
        email: "waiter2@test.com",
        password,
        role: 0
      }
    ]);

    console.log("Users seeded ✅");
  } else {
    console.log("Users already exist ❌");
  }
};

module.exports = seedUsers;