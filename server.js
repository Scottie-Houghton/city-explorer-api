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

app.get('/weather', async (request, response) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&units=I&days=5&lat=${lat}&lon=${lon}`;
    let results = await axios.get(url);
    let dailyForecast = results.data.data.map(day => new Forecast(day));
    response.status(200).send(dailyForecast);
  } catch (error) {
    response.send(error);
  }
});

// app.get('/movies', async (request, response) => {
//   try {
//     let queryCity = request.query.query;
//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${queryCity}`;
//     let results = await axios.get(url);
//     let dailyForecast = results.data.data.map(day => new Forecast(day));
//     response.status(200).send(dailyForecast);
//   } catch (error) {
//     response.send(error);
//   }
// });

app.get('*', (request, response) => {
  response.status(404).send('The thing you are looking for doesn\'t esist');
});



class Forecast {
  constructor(dayObject) {
    this.date = dayObject.datetime;
    this.description = dayObject.weather.description;
  }
}

// class Forecast {
//   constructor(dayObject) {
//     this.date = dayObject.datetime;
//     this.description = dayObject.weather.description;
//   }
// }



app.use((error, request, response) => {
  response.status(500).send(error.message);
});



app.listen(PORT, () => console.log(`listening on port ${PORT}`));
