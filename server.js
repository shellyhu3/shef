const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors');
const bcrypt = require('bcrypt');
const saltRounds= 10;
const db = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'shell',
    password: 'root',
    database: 'shef'
  }
});
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = 'aoufhakdfmberh';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const register = require('./controllers/register');
const login = require('./controllers/login');
const meals = require('./controllers/meals');

const api = require('./api');

app.get('/recipes/:ingred1?', (req,res) => {
  api.searchRecipe(req.params.ingred1)
    .then(data=>res.json(data))
    .catch(err=>res.json(err));
})

app.get('/recipe/:recipe_id', (req, res) => {
  api.getRecipe(req.params.recipe_id)
  .then(data=>res.json(data))
  .catch(err=>res.json(err));
})


app.post('/login', login.handleLogin(db, bcrypt, jwt, TOKEN_SECRET))

app.post('/register', register.handleRegister(db, bcrypt, saltRounds, jwt, TOKEN_SECRET))

app.post('/meals', meals.addMeals(db))

app.get('/meals/:id', meals.getMeals(db))

app.listen(8000, () => console.log('listening on 8000'));