import mongoose from "mongoose";
import User from "../models/user";
// import dotenv from "dotenv";

// dotenv.config({
//   path: "../../../.env",
// });

// database connection
if (process.env.MONGODB_URI)
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database connected.");
    })
    .catch((err) => {
      console.log(err.message);
    });

// seeder method

const importUser = async () => {
  try {
    await User.create({
      firstName: "Deal Clicks",
      lastName: "Admin",
      email: "dealclicks.admin@gmail.com",
      password: "admin1234",
      type: "admin",
      verified: true,
    });

    console.log("Seeder users executed.");

    process.exit(0);
  } catch (error) {
    console.log(error);
    console.log("Seeders users failed to import.");

    process.exit(1);
  }
};

importUser();
