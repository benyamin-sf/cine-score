import MovieModalHeader from './MovieModalHeader'
import MovieModalBody from './MovieModalBody'
import type { MovieDetails } from '../types/movie'

function MovieModal({
  watchedList,
  currentMovie,
  onCurrentMovieReset,
  onAddSelectedToWatchlist,
  onWatchlistMovieDeletion,
  onSettingSelectedMovieUserRating,
}: Readonly<{
  watchedList: MovieDetails[]
  currentMovie: MovieDetails | undefined
  onCurrentMovieReset: () => void
  onAddSelectedToWatchlist: (movie: MovieDetails | undefined) => void
  onWatchlistMovieDeletion: (imdbId: string) => void
  onSettingSelectedMovieUserRating: (userRating: number) => void
}>) {
  return (
    <div className="movie-modal">
      {currentMovie && (
        <>
          <MovieModalHeader
            currentMovie={currentMovie}
            onCurrentMovieUnset={onCurrentMovieReset}
          />

          <MovieModalBody
            watchedList={watchedList}
            currentMovie={currentMovie}
            onAddSelectedToWatchlist={onAddSelectedToWatchlist}
            onSettingSelectedMovieUserRating={onSettingSelectedMovieUserRating}
            onWatchlistMovieDeletion={onWatchlistMovieDeletion}
          />
        </>
      )}
    </div>
  )
}

export default MovieModal
