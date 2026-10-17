import type { MovieDetails } from '../types/movie'

import { WatchedListItem } from './MovieItems'
import MovieAttributes from './MovieAttributes'

export function WatchedList({
  watchedMovies,
  onFetchSelected,
  onWatchlistMovieDeletion,
}: Readonly<{
  watchedMovies: MovieDetails[]
  onFetchSelected: (imdbId: string) => Promise<void>
  onWatchlistMovieDeletion: (imdbId: string) => void
}>) {
  if (watchedMovies.length === 0) {
    return (
      <ul className="movie-list">
        <h4>Your watched list is empty...</h4>
      </ul>
    )
  }

  return (
    <ul className="movie-list">
      {watchedMovies.map((movie) => (
        <WatchedListItem
          key={movie.imdbId}
          movie={movie}
          onFetchSelected={onFetchSelected}
          onWatchlistMovieDeletion={onWatchlistMovieDeletion}
        />
      ))}
    </ul>
  )
}

export function WatchedListHeader({
  watchedMovies,
}: Readonly<{
  watchedMovies: MovieDetails[]
}>) {
  const userRatingsAvg =
    watchedMovies.reduce((acc, movie) => acc + movie.userRating, 0.0) /
    watchedMovies.length

  const imdbRatingsAvg =
    watchedMovies.reduce(
      (acc, movie) => acc + Number.parseFloat(movie.imdbRating),
      0.0,
    ) / watchedMovies.length

  const watchedListHeaderAttr = [
    {
      emoji: '#️⃣',
      desc: `${watchedMovies.length === 0 ? 'No movies' : `${watchedMovies.length} items`}`,
    },
    {
      emoji: '⭐️',
      desc: isNaN(userRatingsAvg) ? 'N/A' : userRatingsAvg.toFixed(1),
    },
    {
      emoji: '🌟',
      desc: isNaN(imdbRatingsAvg) ? 'N/A' : imdbRatingsAvg.toFixed(1),
    },
    {
      emoji: '⏳️',
      desc: `${watchedMovies.reduce((acc, movie) => {
        const parsedDuration = Number.parseInt(movie.duration)
        if (isNaN(parsedDuration)) return acc
        return acc + parsedDuration
      }, 0)} minutes`,
    },
  ]

  return (
    <header className="watched-list__header">
      <h2>Movies you watched</h2>
      <MovieAttributes attrs={watchedListHeaderAttr} />
    </header>
  )
}
