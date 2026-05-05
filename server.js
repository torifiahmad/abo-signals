import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import analyzeHandler from './api/analyze.js';
import pricesHandler from './api/prices.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Route default / to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route
app.post('/api/analyze', async (req, res) => {
  try {
    await analyzeHandler(req, res);
  } catch (err) {
    console.error("Error in API handler:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/prices', async (req, res) => {
  try {
    await pricesHandler(req, res);
  } catch (err) {
    console.error("Error in Prices handler:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running! Open http://localhost:${PORT} in your browser.`);
});
