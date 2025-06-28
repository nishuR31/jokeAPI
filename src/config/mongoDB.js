import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
let mongoUri = process.env.MONGO_URI;
let connectDb = async () => {
  try {
    let connect = await mongoose.connect(mongoUri);
    console.log(`Mongo Db successfully connected..`);
  } catch (err) {
    console.log(`Error connecting to mongoDB:${err}`);
  }
};

export default connectDb;
