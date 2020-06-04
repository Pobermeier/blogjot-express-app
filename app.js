const express = require('express');

const app = express();
const PORT = 5000;

// Index route
app.get('/', (req, res) => {
  res.send('INDEX');
});

app.get('/about', (req, res) => {
  res.send('ABOUT');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
