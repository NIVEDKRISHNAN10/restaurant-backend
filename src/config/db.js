const mongoose = require("mongoose");
const runSeeders = require("../seeders"); // 👈 import main seeder

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // ✅ Run seeders here
    if (process.env.SEED === "true") {
      await runSeeders();
    }

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;