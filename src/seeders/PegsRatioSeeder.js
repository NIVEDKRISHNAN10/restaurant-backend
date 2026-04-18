const Pegs = require("../models/PegsRatio");

const seedPegs = async () => {
    const count = await Pegs.countDocuments();

    if (count === 0) {
        console.log("Seeding pegs...");

        await Pegs.insertMany([
            { volume: "250ml", pegs: 20 },
            { volume: "500ml", pegs: 15 },
            { volume: "1L", pegs: 10 },
        ]);

        console.log("Pegs seeded ✅");
    } else {
        console.log("Pegs already exist ❌");
    }
};

module.exports = seedPegs;