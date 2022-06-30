'use strict';

const axios = require('axios');

async function getWeather(request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&units=I&days=5&lat=${lat}&lon=${lon}`;
    let results = await axios.get(url);
    let dailyForecast = results.data.data.map(day => new Forecast(day));
    response.status(200).send(dailyForecast);
  } catch (error) {
    // response.send(error);
    next(error);
  }
}

class Forecast {
  constructor(dayObject) {
    this.date = dayObject.datetime;
    this.description = dayObject.weather.description;
  }
}

module.exports = getWeather;
