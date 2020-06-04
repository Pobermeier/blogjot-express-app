const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = 5000;

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Index route
app.get('/', (req, res) => {
  const title = 'Welcome to BlogJot!';
  res.render('index', {
    title,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
