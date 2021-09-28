/*********************************
 *  Requirements *
*********************************/

const express = require('express');
const Pokemon = require('./models/pokemon.js');
const PORT = 3000;
const app = express();

/*********************************
 *  Middleware *
*********************************/

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

/*********************************
 *  Routes *
*********************************/

app.get('/pokemon', (req, res) => {
  res.render('index.ejs', { data: Pokemon });
})

app.get('/pokemon/:id', (req, res) => {
  res.render('show.ejs', { data: Pokemon[Number(req.params.id) - 1] });
})

/*********************************
 *  Listener *
*********************************/

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
})