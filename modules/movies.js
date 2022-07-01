'use strict';

const axios = require('axios');

let cache = {};

async function getMovies(request, response) {
  try {
    let queryCity = request.query.searchQuery;
    let key = queryCity + 'Data';
    let acceptableDiff = 1000 * 60 * 60 * 24 * 30;
    if (cache[key] && Date.now() - cache[key].timestamp < acceptableDiff) {
      response.status(200).send(cache[key].data);
    } else {
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${queryCity}&include_adult=false`;
      let cityMovies = await axios.get(url);
      let moviesArray = cityMovies.data.results.map(movie => new Movies(movie));

      cache[key] = {
        data: moviesArray,
        timestamp: Date.now()
      };

      response.status(200).send(moviesArray);
    }
  } catch (error) {
    response.send(error);
  }
}


class Movies {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.description = movieObj.overview;
    this.src = movieObj.poster_path ? movieObj.poster_path : './public/images/movie-reel.png';
  }
}

module.exports = getMovies;
