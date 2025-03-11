import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server running on ${port}`);
  connectDB();
});
