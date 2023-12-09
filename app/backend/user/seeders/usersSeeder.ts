import mongoose from "mongoose";
import User from "@/app/backend/user/models/user";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../../../.env"),
});

// database connection
if (process.env.MONGODB_URI)
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database connected.");
    })
    .catch((err: any) => {
      console.log("Database failed to connect. ", err.message);
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
        isVerified: true,
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
