import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectdb = () => {
  try {
    mongoose.connect(process.env.MONGO_CONN);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectdb;
