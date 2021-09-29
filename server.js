/*********************************
 *  Requirements *
*********************************/

const express = require('express');
const methodOverride = require('method-override');
const Pokemon = require('./models/pokemon.js');
const PORT = 3000;
const app = express();

/*********************************
 *  Middleware *
*********************************/

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

/*********************************
 *  Routes *
*********************************/

//Index Route
app.get('/pokemon', (req, res) => {
  res.render('index.ejs', { data: Pokemon });
})

//New Route
app.get('/pokemon/new', (req, res) => {
  res.render('new.ejs', { data: Pokemon[Pokemon.length - 1].id });
})

//Delete Route
app.delete('/pokemon/:id', (req, res) => {
  Pokemon.splice(Number(req.params.id) - 1, 1);
  res.redirect('/pokemon');
})

//Update Route
app.put('/pokemon/:id', (req, res) => {
  console.log(req.body);
  Pokemon[req.params.id - 1].name = req.body.name;
  Pokemon[req.params.id - 1].type = req.body.type.split(" ");
  Pokemon[req.params.id - 1].stats.hp = req.body.hp
  Pokemon[req.params.id - 1].stats.attack = req.body.attack
  Pokemon[req.params.id - 1].stats.defense = req.body.hdefense
  Pokemon[req.params.id - 1].stats.spattack = req.body.spattack
  Pokemon[req.params.id - 1].stats.spdefense = req.body.spdefense
  Pokemon[req.params.id - 1].stats.speed = req.body.speed
  res.redirect('/pokemon');
})

//Create Route
app.post('/pokemon', (req, res) => {
  req.body.type = req.body.type.split(" ");
  req.body.stats.push(req.body.hp)
  req.body.stats.push(req.body.attack)
  req.body.stats.push(req.body.defense)
  req.body.stats.push(req.body.spattack)
  req.body.stats.push(req.body.spdefense)
  req.body.stats.push(req.body.speed)
  Pokemon.push(req.body)
  res.redirect('/pokemon');
})

//Edit Route
app.get('/pokemon/:id/edit', (req, res) => {
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