const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;
const session = require('express-session');

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

require('dotenv').config(); // MOET bovenaan staan voor de database link!
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const path = require('path'); // Ingebouwd in Node, hoef je niet te installeren


// Database connectie variabelen
const uri = process.env.URI;
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Succesvol verbonden met MongoDB via MongoClient");
    } catch (error) {
        console.error("Database verbinding mislukt:", error);
    }
}
connectDB();

// Middleware instellen
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-geheim',
  resave: false,
  saveUninitialized: false
}));

// Een test route
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/matching', (req, res) => {
  res.render('matching');
});


app.get('/crew-profile', (req, res) => {
  
const projectImages = [
"/images/placeholder-hero.jpg",
"/images/cameraman.png",
"/images/home-page-image.png"
];

res.render('crew-profile', {
projectImages: projectImages
});
  res.render('crew-profile');
});

app.get('/profielPaginaIndividueel', (req, res) => {
  res.render('profielPaginaIndividueel');
});