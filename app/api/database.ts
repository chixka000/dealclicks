import mongoose from "mongoose";

async function connectDatabase() {
  if (mongoose.connections[0].readyState) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    mongoose.connect(process.env.MONGODB_URI!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    connection.on("error", (error) => {
      console.log(
        "Database failed to connect. make sure your MongDB is running " + error
      );

      process.exit();
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

export default connectDatabase;
