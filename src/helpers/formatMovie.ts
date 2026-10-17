import type {
  Movie,
  MovieDetails,
  rawMovie,
  rawMovieDetails,
} from '../types/movie'

export function formatMovieList(rawData: rawMovie[]): Movie[] {
  return rawData.map((d) => {
    return {
      title: d.Title,
      year: d.Year,
      imdbId: d.imdbID,
      type: d.Type,
      poster: d.Poster,
    }
  })
}

export function formatMovieDetails(rawData: rawMovieDetails): MovieDetails {
  return {
    title: rawData.Title,
    imdbId: rawData.imdbID,
    actors: rawData.Actors.split(', '),
    directors: rawData.Director.split(', '),
    country: rawData.Country.split(', '),
    plot: rawData.Plot,
    poster: rawData.Poster,
    tags: rawData.Genre.split(', '),
    rated: rawData.Rated,
    imdbRating: rawData.imdbRating,
    rottenTomatoesRating: rawData.Ratings.find(
      (rating) => rating.Source === 'Rotten Tomatoes',
    )?.Value,
    metacriticRating: rawData.Ratings.find(
      (rating) => rating.Source === 'Metacritic',
    )?.Value,
    released: rawData.Released,
    year: rawData.Year,
    duration: rawData.Runtime,
    type: rawData.Type,
    userRating: 0,
  }
}
