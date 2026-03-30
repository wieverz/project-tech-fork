const express = require('express');
const app = express();
const session = require('express-session');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const path = require('path');

// 1. Dotenv alleen laden als we NIET op Vercel (productie) zitten
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// 2. Middleware & Instellingen
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-geheim',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // Veilig op Vercel (https)
    maxAge: 3600000 
  }
}));

// Gebruikersnaam beschikbaar maken voor alle views (header)
app.use((req, res, next) => {
  res.locals.username = req.session.username || null;
  next();
});

// 3. Database Connectie Logica
let db;
let profileCollection;

async function connectDB() {
  if (db) return db;
  try {
    // Gebruik de naam die je in Vercel Dashboard zet (bijv. MONGODB_URI)
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db("filmcrew");
    profileCollection = db.collection("profiles");
    console.log("Database verbinding succesvol!");
    return db;
  } catch (error) {
    console.error("Verbindingsfout:", error);
    // We gooien de error niet dood, zodat de server kan blijven ademen
  }
}

// 4. Auth Middleware
function checkInlog(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.redirect('/login');
  }
}

// 5. Routes
app.get('/', async (req, res) => {
  await connectDB();
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  try {
    await connectDB();
    const { username, email, age, password, function: userFunction, bio, experience } = req.body;
    const userExists = await profileCollection.findOne({ name: username });
    if (userExists) return res.send('Deze naam is al bezet.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name: username, email, age: Number(age), password: hashedPassword,
      role: userFunction, bio, experience: Number(experience), createdAt: new Date()
    };

    await profileCollection.insertOne(newUser);
    res.redirect('/login');
  } catch (err) {
    res.status(500).send("Fout bij registreren.");
  }
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  try {
    await connectDB();
    const { username, password } = req.body;
    const user = await profileCollection.findOne({ name: username });

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userID = user._id;
      req.session.username = user.name;
      return res.redirect('/current-matches');
    }
    res.render('login', { error: 'Onjuiste gegevens' });
  } catch (err) {
    res.status(500).send("Serverfout.");
  }
});

app.get('/current-matches', checkInlog, async (req, res) => {
  res.render('current-matches');
});

app.get('/crew-profile', (req, res) => {
  res.render('crew-profile', {
    projectImages: ["/images/placeholder-hero.jpg", "/images/cameraman.png"],
    projectTags: ["Sci-Fi", "Action"]
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// 6. Vercel Export & Local Listen
if (process.env.NODE_ENV !== 'production') {
  const port = 4000;
  app.listen(port, () => console.log(`Draait op http://localhost:${port}`));
}

module.exports = app;