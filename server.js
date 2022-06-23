'user strict';

// console.log('my first server');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// let data = require('./data/weather.json');


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;



app.get('/', (request, response) => {
  response.status(200).send('hello from our server!');
});

// app.get('/hello', (request, response) => {
//   console.log(request.query.name);
//   let name = request.query.name;
//   response.send(`Hello, ${name}!`);
// });

// app.get('/daily', async (request, response) => {
//   let searchQueryFromFrontEnd = request.query.searchQuery;
//   let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQueryFromFrontEnd}&key=${process.env.WEATHERBIT_API_KEY}`;
//   let results = await axios.get(url);
//   console.log(results.data);
//   response.sendStatus('hi');
// });

app.get('/weather', async (request, response) => {
  try {
    let queryCity = request.query.searchQuery;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${queryCity}&key=${process.env.WEATHERBIT_API_KEY}`;
    let results = await axios.get(url);

    let cityData = results.find(object => object.city_name.toLowerCase() === queryCity.toLowerCase());
    let dailyForecast = cityData.data.map(day => new Forecast(day));
    response.status(200).send(dailyForecast);
  } catch (error) {
    next(error);
  }
});

app.get('*', (request, response) => {
  response.status(404).send('The thing you are looking for doesn\'t esist');
});



class Forecast {
  constructor(dayObject) {
    this.date = dayObject.datetime;
    this.description = dayObject.weather.description;
  }
}



app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});



app.listen(PORT, () => console.log(`listening on port ${PORT}`));
