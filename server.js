'user strict';

// console.log('my first server');

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');

const cors = require('cors');


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;



app.get('/', (request, response) => {
  response.send('hello from our server!');
});

// app.get('/hello', (request, response) => {
//   console.log(request.query.name);
//   let name = request.query.name;
//   response.send(`Hello, ${name}!`);
// });

app.get('/weather', (request, response) => {
  try {
    let queryCity = request.query.searchQuery;
    let cityData = data.find(object => object.city_name.toLowerCase() === queryCity.toLowerCase());
    let dailyForecast = cityData.data.map(day => new Forecast(day));
    response.status(200).send(dailyForecast);
  } catch (error) {
    next(error);
  }
});

app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t esist');
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
