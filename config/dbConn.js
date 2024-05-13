import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/agree");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
