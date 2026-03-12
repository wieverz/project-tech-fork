const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;
const session = require('express-session');
const bcrypt = require('bcrypt');

app.use(session({
  secret: 'redbullgeeftjevleugels', // willekeurige lange zin
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Zet op true als je https gebruikt, maar op localhost is false prima
    maxAge: 3600000 // Hoe lang de cookie geldig is (1 uur)
  }
}));
app.use(express.urlencoded({ extended: true }))
app.use(express.static("static"));
app.set('view engine', 'ejs');
app.set('views', './views');



mongoose.connect(process.env.DB_URL);
/////// mongo db:
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();

// Vertel Express dat we EJS gebruiken
app.set('view engine', 'ejs');

// Zorg dat Express bestanden uit de 'public' map kan lezen (voor CSS/Plaatjes)
app.use(express.static('public'));

// De route voor de homepage
app.get('/', (req, res) => {
  res.render('index'); // Dit zoekt naar views/index.ejs
});

app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});