const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Home page
app.get("/", (req, res) => {
  res.send("Logger online");
});

// Logging endpoint
app.post("/log", (req, res) => {
  const data = {
    ip: req.headers["x-forwarded-for"] || req.ip,
    event: req.body.event || "unknown",
    time: new Date().toString()
  };

  fs.appendFileSync("logs.txt", JSON.stringify(data) + "\n");
  res.json({ status: "logged" });
});

// Start
app.listen(port, () => console.log("Logger running on port " + port));

