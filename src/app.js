const express = require("express");

const app = express();
const authMiddleware = require("./middleware/authmidlleware");
const roleMiddleware = require("./middleware/roleMiddleware");

app.use(express.json());

// Public routes (NO middleware)
app.use("/api/auth", require("./routes/authRoutes"));

// Only waiter (worker)
app.use(
  "/api/user",
  authMiddleware,
  roleMiddleware('waiter'), // or "waiter" based on your role name
  require("./routes/UserRoutes")
);

// Admin + Worker both can access orders
app.use(
  "/api/auth",
  authMiddleware,
  roleMiddleware('admin','waiter'),
  require("./routes/orderRoutes")
);

app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app;