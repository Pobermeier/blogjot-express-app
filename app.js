const path = require('path');
const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
const PORT = 5000;

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport config
require('./config/passport')(passport);

// Connect to DB via Mongoose
mongoose
  .connect(
    'mongodb+srv://pober:BuA7yjysl6bEsU9d@cluster0-uclm9.mongodb.net/blogjot?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(err);
  });

// Set-up express static folder
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars Middleware
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  }),
);
app.set('view engine', 'handlebars');

// Body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method-override middleware
app.use(methodOverride('_method'));

// Express-session middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect-flash middleware
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Index route
app.get('/', (req, res) => {
  const title = 'Welcome to BlogJot!';
  res.render('index', {
    title,
  });
});

// About-page route
app.get('/about', (req, res) => {
  res.render('about');
});

// use routes
app.use('/ideas', ideas);
app.use('/users', users);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
