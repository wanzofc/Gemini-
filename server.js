const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000; // Port yang digunakan
const API_KEY = "AIzaSyBkpO7eV5Qxps2EDixEtbWjLBXsfDfqsus";

app.use(cors());
app.use(express.json());

// Endpoint real-time dengan nama 'GeminiData'
app.get("/GeminiData", async (req, res) => {
  try {
    // Contoh permintaan real-time (API disesuaikan)
    const response = await axios.get(`https://gemini-production.up.railway.app//data?key=${API_KEY}`);
    res.status(200).json({
      name: "Gemini API",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching data", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
