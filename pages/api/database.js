import mongoose from "mongoose";

async function connectDatabase() {
    if (mongoose.connections[0].readyState) {
        console.log('MongoDB is already connected');
        return;
      }
    
      try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
      } catch (error) {
        console.error('Error connecting to MongoDB', error);
      }
}

export default connectDatabase