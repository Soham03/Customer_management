
// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/Customer_Management")
//   .then(() => console.log("Database Connected"))
//   .catch((err) => console.log(err));

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;