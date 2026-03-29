const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;
const session = require('express-session');
const multer = require('multer');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

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
app.get('/register2', (req, res) => {
  res.render('register2');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/matching', (req, res) => {
  res.render('matching');
});

app.get('/profielPaginaIndividueel', (req, res) => {
  res.render('profielPaginaIndividueel');
});

// crew profile

app.get('/crew-profile', async (req, res) => {
    try {

        const db = client.db('filmcrew');

        // 1. Haal het project op, het eerste project wat je ziet. 
        const project = await db.collection('projects').findOne({}) || {};

        // We zoeken in de collectie 'filters' binnen de database 'filmcrew'
        const projectFilters = await db.collection('filters').find({}).toArray();

        // pak alle foto's van de database en stop dit in een array. Als project.images niet bestaat, maken we er een lege array [] van.
        const projectImages = project.images || []; 

        // Stuur alles naar de EJS
        res.render('crew-profile', {
            projectData: project,   // Bevat: title, subtitle, description, images
            projectImages: projectImages || [], // De array met fotopaden voor je slideshow
            projectFilters: projectFilters || []
        });
    } catch (error) {
        console.error("Fout bij ophalen profiel/project:", error);
        res.status(500).send("Fout bij laden profiel");
    }
});

//  upload.array omdat je meerdere foto's tegelijk kunt uploaden.
app.post('/save-project', upload.array('projectImages'), async (req, res) => {
    try {
        const db = client.db('filmcrew');

        // De lijst van foto's die overblijven na het klikken op verwijderen
        let remainingImages = [];
        // maak er een array van en sla geen lege velden op. 
        if (req.body.remainingImages) {
            remainingImages = req.body.remainingImages.split(',').filter(path => path !== "");
        }

        // nieuwe foto's, neem hun pad
        const newUploads = req.files.map(file => `/uploads/${file.filename}`);

        // combineren van nieuwe met oude foto's
        const finalImagesList = [...remainingImages, ...newUploads];

        // pak alle veranderingen bij elkaar en stop dit in een object
        const updatedProject = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            images: finalImagesList, // We overschrijven de oude lijst volledig
            type: req.body.type,
            genre: req.body.genre, 
            updatedAt: new Date()
        };

        await db.collection('projects').updateOne(
            {}, // upload naar het eerste project wat je ziet 
            { $set: updatedProject }, // vervang oude data met nieuwe data 
            { upsert: true } // maak aan als er nog geen project bestaat
        );

        res.redirect('/crew-profile'); // stuur gebruiker terug naar crew-profile 
    } catch (error) {
        console.error("Opslaan mislukt:", error);
        res.status(500).send("Fout bij opslaan");
    }
});

app.get('/current-matches', (req, res) => {
  res.render('current-matches');
});

