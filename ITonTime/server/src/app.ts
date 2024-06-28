import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes";
import mongoose from "mongoose";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/tasks", taskRoutes);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Sever is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:\n", err);
  });
