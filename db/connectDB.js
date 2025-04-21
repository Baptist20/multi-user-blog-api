const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅✅ Database connected!!!");
  } catch (error) {
    process.exit(1); // Graceful failure
    console.error("error connecting to the database ❌❌");
  }
};

module.exports = connectDB;
