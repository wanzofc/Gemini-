const express = require("express");
const fetch = require("node-fetch"); // Pastikan node-fetch terinstal
const cors = require("cors");

const app = express();
const port = 3000;
const creator = "wanzofc"; // Nama Pembuat API
const API_KEY = "AIzaSyBkpO7eV5Qxps2EDixEtbWjLBXsfDfqsus"; // API Key Gemini

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

// Endpoint real-time dari API eksternal Gemini
app.get("/ai/gemini", async (req, res) => {
  let text = req.query.text;
  
  if (!text) {
    return res.json({
      status: false,
      code: 400,
      message: "Text query is missing.",
      creator: creator,
    });
  }

  try {
    // Membuat permintaan ke API eksternal Gemini dengan menyertakan API Key
    const response = await fetch(`https://gemini-production.up.railway.app/?query=${text}&key=${API_KEY}`);
    const data = await response.json();

    if (data.status !== true) {
      res.json({
        status: false,
        code: 503,
        message: "Service got error, try again in 10 seconds.",
        creator: creator,
      });
    } else {
      res.json({
        status: true,
        code: 200,
        result: data.result.message,
        creator: creator,
      });
    }
  } catch (e) {
    console.error(e);
    res.json({
      status: false,
      code: 500,
      message: "An error occurred while processing the request.",
      creator: creator,
    });
  }
});

// 404 Handler untuk rute yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    status: false,
    code: 404,
    message: "Route not found. Please check the URL.",
    creator: creator,
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
