import type { Movie, MovieDetails } from '../types/movie'

import Poster from './Poster'
import MovieAttributes from './MovieAttributes'

export function MovieListItem({
  movie,
  onFetchSelected,
}: Readonly<{
  movie: Movie
  onFetchSelected: (imdbId: string) => Promise<void>
}>) {
  return (
    <li className="movie-item" onClick={() => onFetchSelected(movie.imdbId)}>
      <div className="movie-item__img">
        <Poster
          key={movie.imdbId}
          src={movie.poster}
          alt={`${movie.title} poster`}
        />
      </div>
      <div className="movie-item__data">
        <h3>{movie.title}</h3>
        <MovieAttributes
          attrs={[
            {
              emoji: '📼',
              desc: movie.type,
            },
            {
              emoji: '🗓️',
              desc: movie.year,
            },
          ]}
        />
      </div>
    </li>
  )
}

export function WatchedListItem({
  movie,
  onFetchSelected,
  onWatchlistMovieDeletion,
}: Readonly<{
  movie: MovieDetails
  onFetchSelected: (imdbId: string) => Promise<void>
  onWatchlistMovieDeletion: (imdbId: string) => void
}>) {
  return (
    <li className="movie-item" onClick={() => onFetchSelected(movie.imdbId)}>
      <div className="movie-item__img">
        <Poster
          key={movie.imdbId}
          src={movie.poster}
          alt={`${movie.title} poster`}
        />
      </div>
      <div className="movie-item__data">
        <h3>{movie.title}</h3>
        <MovieAttributes
          attrs={[
            {
              emoji: '⭐️',
              desc: `${movie.userRating}`,
            },
            {
              emoji: '🌟',
              desc: movie.imdbRating,
            },
            {
              emoji: '⏳️',
              desc: movie.duration,
            },
          ]}
        />

        <button
          type="button"
          title="Remove from watchlist"
          onClick={(e) => {
            e.stopPropagation()
            onWatchlistMovieDeletion(movie.imdbId)
          }}
        >
          <svg>
            <use href="/wastebin.svg" />
          </svg>
        </button>
      </div>
    </li>
  )
}
