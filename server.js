const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000; // Port langsung didefinisikan di dalam kode
const API_KEY = "AIzaSyBkpO7eV5Qxps2EDixEtbWjLBXsfDfqsus"; // API Key langsung

// Middleware
app.use(cors());
app.use(express.json());

// Creator name
const creator = "wanzofc";

// Endpoint root untuk informasi dasar
app.get("/", (req, res) => {
  res.status(200).json({
    result: "success",
    name: creator,
    message: "Welcome to Gemini API",
    realTime: true,
  });
});

// Endpoint AI Gemini
app.get("/ai/gemini", async (req, res) => {
  const text = req.query.text; // Ambil teks dari query

  if (!text) {
    // Jika tidak ada teks yang dikirimkan
    return res.status(400).json({
      status: false,
      code: 400,
      message: "Text query is required.",
      creator: creator
    });
  }

  try {
    // Melakukan permintaan ke API eksternal
    const response = await axios.get(`https://gemini-production.up.railway.app/search?query=${text}&key=${API_KEY}`);

    if (response.data.status !== true) {
      // Jika status response dari API tidak true
      return res.status(500).json({
        status: false,
        code: 503,
        message: "Service error. Please try again.",
        creator: creator
      });
    }

    // Jika API berhasil memberikan respons
    res.status(200).json({
      status: true,
      code: 200,
      result: response.data.result.message, // Mengambil pesan dari hasil response API
      creator: creator
    });

  } catch (error) {
    console.error(error); // Log error untuk debugging
    res.status(500).json({
      status: false,
      code: 500,
      message: "Error fetching data from Gemini API.",
      creator: creator
    });
  }
});

// Endpoint custom dengan query default 'wanzofc'
app.get("/custom", async (req, res) => {
  const query = req.query.query || "wanzofc"; // Menggunakan query yang diberikan atau 'wanzofc' sebagai default

  try {
    // Melakukan permintaan pencarian
    const response = await axios.get(`https://gemini-production.up.railway.app/search?query=${query}&key=${API_KEY}`);

    if (response.data.status !== true) {
      return res.status(500).json({
        status: false,
        code: 503,
        message: "Error processing custom query.",
        creator: creator
      });
    }

    res.status(200).json({
      status: true,
      code: 200,
      result: response.data.result.message, // Mengambil hasil pesan dari API
      creator: creator
    });

  } catch (error) {
    console.error(error); // Log error untuk debugging
    res.status(500).json({
      status: false,
      code: 500,
      message: "Error processing custom query.",
      creator: creator
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: false,
    code: 404,
    message: "Route not found. Please check the URL.",
    creator: creator
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
