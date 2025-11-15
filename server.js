import express from "express";
import fs from "fs";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(cors());

// Logging endpoint
app.post("/log", async (req, res) => {
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Get visitor country
  let country = "Unknown";
  try {
    const response = await fetch(`https://ipapi.co/${ip}/country_name/`);
    country = await response.text();
  } catch (err) {}

  const logEntry = `
IP: ${ip}
Country: ${country}
Event: ${req.body.event}
Time: ${new Date().toISOString()}
------------------------------
`;

  fs.appendFileSync("logs.txt", logEntry);

  res.json({ success: true });
});

// Start server
app.listen(3000, () => {
  console.log("Logger running on port 3000");
});
