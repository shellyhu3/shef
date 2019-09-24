const axios = require('axios');
const queryString = require ('query-string');
const crypto = require('crypto');

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

async function searchRecipe(query=' ', maxResults=20, pageNum=0){
  const methodParams = {
    method: 'recipes.search',
    max_results: maxResults,
    search_expression: query,
    page_number: pageNum
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

module.exports = {
  searchRecipe,
  getRecipe
}