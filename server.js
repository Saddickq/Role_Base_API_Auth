import express from "express";
import cors from "cors";
import { DB_URL, PORT, SECRET } from "./config/index.js";
import mongoose from "mongoose";
import routes from "./routes/users.js"

const app = express();

app.use(cors());

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
