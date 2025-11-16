import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./Router/UserRouter.js";
import postrouter from "./Router/PostRouter.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Allow both local & deployed frontend dynamically
const allowedOrigins = [
  "http://localhost:5173",
  // "https://hubly-t2vc.onrender.com",
  "https://hubly-io-a026.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch((err) => console.log("❌ Database Connection Failed:", err));

app.use("/api", router);
app.use("/post", postrouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
