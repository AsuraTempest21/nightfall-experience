import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import menuRoutes from "./routes/menu.js";
import eventsRoutes from "./routes/events.js";
import reservationsRoutes from "./routes/reservations.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

// ─── Phase 3.3: Security middleware ───

// Helmet: sets various security HTTP headers
app.use(helmet());

// CORS: restrict to frontend domain
const allowedOrigins = (process.env.CORS_ORIGINS ?? "http://localhost:8080")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.) in dev
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`));
      }
    },
    credentials: true,
  })
);

// Body parsing with size limit
app.use(express.json({ limit: "10kb" }));

// Phase 3.3: Rate limiting — general
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});
app.use(generalLimiter);

// Phase 3.3: Strict rate limiting on reservation endpoint
const reservationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 reservation attempts per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many reservation attempts. Please try again later." },
});

// ─── Routes ───
app.use("/api/menu", menuRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/reservations", reservationLimiter, reservationsRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Global error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("[Server Error]", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
);

app.listen(PORT, () => {
  console.log(`\n  🌙 Nightfall API running at http://localhost:${PORT}`);
  console.log(`  📍 Health check: http://localhost:${PORT}/api/health\n`);
});

export default app;
