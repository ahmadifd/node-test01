import connectDB from "../config/dbConn.js";
import express from "express";
import mongoose from "mongoose";
import usersRoutes from "../routes/userRoutes.js";

const app = express();

connectDB();
const PORT = process.env.PORT || 3500;

app.use(express.json());

app.use(
  "/users",
  usersRoutes
);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
