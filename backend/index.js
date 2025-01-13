import express from "express";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messages.js";
import dotenv from "dotenv";
import { connectDb } from "./db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket.js";

import path from "path";

dotenv.config();

const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(5000, () => {
  console.log("Server is running on port 5000");
  connectDb();
});
