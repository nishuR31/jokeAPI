import mongoose from "mongoose";

const connectDB = async (mongoUri) => {
  if (!mongoUri) {
    console.error("Mongo URI is missing in environment variables.");
    process.exit(1); // Stop the server if no DB URI
  }
  try {
    await mongoose.connect(mongoUri);

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Stop the server on DB error
  }
};

export default connectDB;
