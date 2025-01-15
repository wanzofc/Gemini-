const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000; // Port langsung didefinisikan di dalam kode
const API_KEY = "AIzaSyBkpO7eV5Qxps2EDixEtbWjLBXsfDfqsus"; // API Key langsung

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint root untuk informasi dasar
app.get("/", (req, res) => {
  res.status(200).json({
    result: "success",
    name: "wanzofc",
    message: "Welcome to Gemini API",
    realTime: true,
  });
});

// Endpoint real-time
app.get("/GeminiData", async (req, res) => {
  try {
    // Data real-time dari API eksternal
    const response = await axios.get(`https://gemini-production.up.railway.app/data?key=${API_KEY}`);
    res.status(200).json({
      result: "success",
      name: "wanzofc",
      message: "Real-time data fetched successfully.",
      realTime: true,
    });
  } catch (error) {
    res.status(500).json({
      result: "error",
      name: "wanzofc",
      message: "Error fetching real-time data.",
      realTime: false,
    });
  }
});

// Endpoint custom dengan query default 'wanzofc'
app.get("/custom", async (req, res) => {
  // Ambil query atau gunakan default 'wanzofc'
  const query = req.query.query || "wanzofc";

  try {
    // Data pencarian dari API eksternal
    await axios.get(`https://gemini-production.up.railway.app/search?query=${query}&key=${API_KEY}`);
    res.status(200).json({
      result: "success",
      name: "wanzofc",
      message: `Custom query processed successfully for '${query}'.`,
      realTime: true,
    });
  } catch (error) {
    res.status(500).json({
      result: "error",
      name: "wanzofc",
      message: "Error processing custom query.",
      realTime: false,
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    result: "error",
    name: "wanzofc",
    message: "Route not found. Please check the URL.",
    realTime: false,
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
