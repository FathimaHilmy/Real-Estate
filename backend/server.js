import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import connectdb from "./db.js";
import cors from "cors";
import router from "./routers.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectdb();

app.listen(process.env.PORT || 3000, () => {
  console.log(`running on ${process.env.PORT}`);
});

app.use("/api", router);
