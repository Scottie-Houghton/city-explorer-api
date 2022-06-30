'use strict';

const axios = require('axios');

function getMovies(request, response) {
  let queryCity = request.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${queryCity}&include_adult=false`;

  axios.get(url)
    .then(cityMovies => cityMovies.data.results.map(movie => new Movies(movie)))
    .then(moviesArray => response.status(200).send(moviesArray))
    .catch(error => console.log(error));
}

class Movies {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.description = movieObj.overview;
    this.src = movieObj.poster_path ? movieObj.poster_path : './public/images/movie-reel.png';
  }
}

module.exports = getMovies;
