import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { postRouter } from "./routes/posts.js";
import { seoRouter } from "./routes/seo.js";

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Origin is not allowed"));
    },
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  }),
);

app.get("/api/health", (_q, s) => s.json({ status: "ok" }));
app.use("/api/posts", postRouter);
app.use("/api/seo", seoRouter);

app.use((_q, s) => s.status(404).json({ message: "Not found" }));
app.use((error, _q, s, _n) => {
  if (error instanceof SyntaxError && "body" in error) {
    return s.status(400).json({ message: "Invalid JSON" });
  }
  if (error?.message === "Origin is not allowed") {
    return s.status(403).json({ message: "Origin is not allowed" });
  }
  console.error(error);
  s.status(error.status || 500).json({
    message: process.env.NODE_ENV === "production" ? "Server error" : error.message || "Server error",
  });
});

export default app;
