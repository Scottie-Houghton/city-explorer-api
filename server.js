'user strict';

// console.log('my first server');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/movies.js');

// let data = require('./data/weather.json');


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;



app.get('/', (request, response) => {
  response.status(200).send('hello from our server!');
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.get('*', (request, response) => {
  response.status(404).send('The thing you are looking for doesn\'t esist');
});



app.use((error, request, response) => {
  response.status(500).send(error.message);
});



app.listen(PORT, () => console.log(`listening on port ${PORT}`));
