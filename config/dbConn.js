import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/node-app02");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
