const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Przykładowa trasa
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});