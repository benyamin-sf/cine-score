export type MovieType = 'movie' | 'series' | 'episode'

export interface Movie {
  title: string
  year: string
  imdbId: string
  type: MovieType
  poster: string
}

export interface MovieDetails {
  title: string
  imdbId: string
  actors: string[]
  directors: string[]
  country: string[]
  plot: string
  poster: string
  tags: string[]
  rated: string
  imdbRating: string
  rottenTomatoesRating: string | undefined
  metacriticRating: string | undefined
  released: string
  year: string
  duration: string
  type: MovieType
  userRating: number
}

export interface rawMovie {
  Title: string
  Year: string
  imdbID: string
  Type: MovieType
  Poster: string
}

export interface rawMovieDetails {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Record<string, string>[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: MovieType
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
