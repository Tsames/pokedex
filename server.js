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

//Index Route
app.get('/pokemon', (req, res) => {
  res.render('index.ejs', { data: Pokemon });
})

//New Route
app.get('/pokemon/new', (req,res) => {
  res.render('new.ejs');
})

//Delete Route

//Update Route

//Create Route

//Edit Route
app.get('/pokemon/:id/edit', (req,res) => {
  res.render('edit.ejs', { data: Pokemon[Number(req.params.id) - 1] })
})

//Show Route
app.get('/pokemon/:id', (req, res) => {
  res.render('show.ejs', { data: Pokemon[Number(req.params.id) - 1] });
})

/*********************************
 *  Listener *
*********************************/

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
})