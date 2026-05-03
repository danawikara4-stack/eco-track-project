const express = require('express');
const path = require('path');
const app = express();

// Serve semua file di folder public/ (index.html, style.css, main.js)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});