import mongoose from "mongoose";
import User from "../models/user";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../../.env"),
});

// database connection
if (process.env.MONGODB_URI)
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database connected.");
    })
    .catch((err) => {
      console.log("asds", err.message);
    });

// seeder method

const importUser = async () => {
  try {
    const user = await User.findOne({ email: "dealclicks.admin@gmail.com" });

    if (!user)
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
    console.log(path.join(__dirname, "../../../.env"));

    console.log("Seeders users failed to import.");

    process.exit(1);
  }
};

importUser();
