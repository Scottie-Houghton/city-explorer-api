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
  let cityFromRequest = request.query.city;
  let dataToSend = data.find(city => city.city_name === cityFromRequest);
  response.send(dataToSend);
});

app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t esist');
});







app.listen(PORT, () => console.log(`listening on port ${PORT}`));
