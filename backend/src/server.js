import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import orgRoutes from "./routes/org.routes.js";
import studentRoutes from "./routes/student.routes.js";
import publicRoutes from "./routes/public.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

dotenv.config();
const app = express();

// middleware
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5000";
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: false,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());
app.use(express.json());
app.use("/uploads", express.static("src/uploads")); // serve files

// routes
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/org", orgRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/public", publicRoutes);

// error handler
app.use(errorMiddleware);

// db connect and server start ONLY if NOT testing
if (process.env.NODE_ENV !== "test") {
  connectDB()
    .then(() => {
      const PORT = process.env.PORT || 5001;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log(err));
}

// export app for tests
export default app;
