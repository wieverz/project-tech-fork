const express = require('express');
const app = express();
const port = 3000;

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