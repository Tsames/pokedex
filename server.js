/*********************************
 *  Requirements *
*********************************/

const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser')
const Pokemon = require('./models/pokemon.js');
const PORT = 3000;
const app = express();

/*********************************
 *  Middleware *
*********************************/

app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'));
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
app.delete('/pokemon/:id', (req,res) => {
  Pokemon.splice(Number(req.params.id) - 1, 1);
  res.redirect('/pokemon');
})

//Update Route
app.put('/pokemon/:id', (req, res) => {
  console.log(Pokemon[req.params.id - 1].name);
  console.log(req.body);
  Pokemon[req.params.id - 1].name = req.body.name
  res.redirect('/pokemon');
})

//Create Route
app.post('/pokemon', (req,res) => {
  console.log(req.body);
  res.redirect('/pokemon/new');
})

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