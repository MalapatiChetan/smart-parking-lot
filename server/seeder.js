const mongoose = require("mongoose");
require("dotenv").config();

const Lot = require("./models/Lot");
const Slot = require("./models/Slot");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear old data
    await Lot.deleteMany();
    await Slot.deleteMany();

    // Create sample lots
    const lots = await Lot.insertMany([
      {
        name: "Main Street Lot",
        location: { lat: 37.7749, lng: -122.4194 },
      },
      {
        name: "Downtown Lot",
        location: { lat: 37.7799, lng: -122.4144 },
      },
    ]);

    // Create slots for each lot
    const slotData = [];

    lots.forEach((lot) => {
      for (let i = 1; i <= 5; i++) {
        slotData.push({
          lotId: lot._id,
          number: `A${i}`,
          status: "available",
        });
      }
    });

    await Slot.insertMany(slotData);

    console.log("🌱 Database seeded successfully.");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedData();
