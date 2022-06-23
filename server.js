'user strict';

// console.log('my first server');

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');



const app = express();

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
  let cityFromRequest = request.query.searchQuery;
  let dataToGroom = data.find(city => city.city_name === cityFromRequest);
  let dailyForecast = dataToGroom.data.map(day => new Forecast(day));
  // let dataToSend = new Forecast(dataToGroom.data);
  response.send(dailyForecast);
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





app.listen(PORT, () => console.log(`listening on port ${PORT}`));
