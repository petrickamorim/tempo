const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = 3000;
const API_KEY = process.env.API_KEY;

app.get("/clima", async (req, res) => {
  const cidade = req.query.city;
  if (!cidade) return res.status(400).json({ error: "Cidade obrigatória." });

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar clima." });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
