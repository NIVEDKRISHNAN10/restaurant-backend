const express = require("express");

const app = express();

app.use(express.json());

//login
app.use("/api/auth", require("./routes/authRoutes"));

//waiter
app.use("/api/user", require("./routes/UserRoutes"));

// Routes
app.use("/api/orders", require("./routes/orderRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app;