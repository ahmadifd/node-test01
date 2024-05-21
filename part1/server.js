import connectDB from "../config/dbConn.js";
import express from "express";
import mongoose from "mongoose";
import usersRoutes from "../routes/userRoutes.js";
import tst1Routes from "../routes/tst1Routes.js";
import tst2Routes from "../routes/tst2Routes.js";
import "dotenv/config";
import { credentials } from "../middleware/credentials.js";
import { corsOptions } from "../config/corsOptions.js";
import cors from "cors";

const app = express();

connectDB();

app.use(credentials);

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3500;

app.use(express.json());

app.use("/users", usersRoutes);

app.use("/tst1", tst1Routes);

app.use("/tst2", tst2Routes);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
