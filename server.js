const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const queryString = require ('query-string');
const crypto = require('crypto');
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

const app = express();
app.use(bodyParser.json());
app.use(cors());

const register = require('./controllers/register');
const login = require('./controllers/login');

const API_PATH = 'https://platform.fatsecret.com/rest/server.api';
const ACCESS_KEY = 'a1fa414bdaa846a898c93dea5d8b3477';
const APP_SECRET = 'dfa828cf1102480e8856059caa449684';
const OAUTH_VERSION = '1.0';
const OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1';

function getOauthParameters() {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  return {
    oauth_consumer_key: ACCESS_KEY,
    oauth_nonce: `${timestamp}${Math.floor(Math.random() * 1000)}`,
    oauth_signature_method: OAUTH_SIGNATURE_METHOD,
    oauth_timestamp: timestamp,
    oauth_version: OAUTH_VERSION,
  }
}

function getSignature(queryParams, httpMethod='GET') {
  const signatureBaseString = [
    httpMethod,
    encodeURIComponent(API_PATH),
    encodeURIComponent(queryString.stringify(queryParams))
  ].join('&');
  const signatureKey = `${APP_SECRET}&`;
  return crypto.createHmac('sha1', signatureKey).update(signatureBaseString).digest('base64');
}

function makeApiCall(methodParams, httpMethod = 'GET') {
  const queryParams = {
    ...getOauthParameters(),
    ...methodParams,
    format: 'json',
  };
  queryParams['oauth_signature'] = getSignature(queryParams, httpMethod);
  return axios.get(`${API_PATH}?${queryString.stringify(queryParams)}`)
    .then(resp => resp.data)
    .catch(err=> console.log(err));
}

async function searchRecipe(query, maxResults=5){
  const methodParams = {
    method: 'recipes.search',
    max_results: maxResults,
    search_expression: query
  }
  const response = await makeApiCall(methodParams);
  return response;
}

async function getRecipe(query){
  const methodParams = {
    method: 'recipe.get',
    recipe_id: query
  }
  const response = await makeApiCall(methodParams);
  return response;
}

app.get('/recipes/:ingred1?', (req,res) => {
  searchRecipe(req.params.ingred1)
    .then(data=>res.json(data))
    .catch(err=>res.json(err));
})

app.get('/recipe/:recipe_id', (req, res) => {
  getRecipe(req.params.recipe_id)
  .then(data=>res.json(data))
  .catch(err=>res.json(err));
})


app.post('/login', login.handleLogin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt, saltRounds))

app.listen(8000, () => console.log('listening on 8000'));