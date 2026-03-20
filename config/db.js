const mongoose = require("mongoose");


if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env file");
}


async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log("Database Connection Error");
    console.log(error.message);
  }
}

module.exports = connectDB;
