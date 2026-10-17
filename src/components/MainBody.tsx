import { useEffect, useState } from 'react'

// Types
import type AppError from '../types/Error'
import type { MovieDetails } from '../types/movie'

// Components
import Box from './Box'
import MovieList from './MovieList'
import { WatchedList, WatchedListHeader } from './WatchedList'
import MovieModal from './MovieModal'
import NetworkFailure from '../components/NetworkFailure'

// helpers
import { api } from '../api'
import {
  loadWatchedListLocalStorage,
  saveWatchedListLocalStorage,
} from '../helpers/localstorage'
import { formatMovieDetails } from '../helpers/formatMovie'

const WATCHED_KEY = 'watched-list-storage'
const savedWatchedlist = loadWatchedListLocalStorage(WATCHED_KEY)

function MainBody({
  searchQuery,
  error,
  onSetMovieCount,
  onSetError,
}: Readonly<{
  searchQuery: string
  error: AppError | undefined
  onSetMovieCount: (count: number) => void
  onSetError: (error: AppError | undefined) => void
}>) {
  const [watchedList, setWatchedList] = useState<MovieDetails[]>(
    savedWatchedlist ? savedWatchedlist : [],
  )
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails>()

  useEffect(
    () => saveWatchedListLocalStorage(WATCHED_KEY, watchedList),
    [watchedList],
  )

  async function handleFetchSelected(imdbId: string) {
    const movieDetailsOverlay = document.querySelector('.movie-modal')
    const previouslyWatched = watchedList.find(
      (movie) => movie.imdbId === imdbId,
    )

    if (previouslyWatched) {
      setSelectedMovie(previouslyWatched)
      if (!movieDetailsOverlay?.classList.contains('.movie-modal--visible'))
        movieDetailsOverlay?.classList.add('movie-modal--visible')
      return
    }

    try {
      const omdbDetailsUrl = `?apikey=${import.meta.env.VITE_OMDB_KEY}&i=${imdbId}`
      const { data } = await api.get(omdbDetailsUrl)
      const formattedData: MovieDetails = formatMovieDetails(data)
      setSelectedMovie(formattedData)
      if (!movieDetailsOverlay?.classList.contains('.movie-modal--visible'))
        movieDetailsOverlay?.classList.add('movie-modal--visible')
    } catch (err) {
      onSetError({ msg: 'Failed to fetch movie data', type: 'network' })
      console.error('Failed to fetch the movie data: ', err)
      // TODO: Implement a toast or notif to warn the user of failure in fetching movie details data
    }
  }

  function handleSettingSelectedMovieUserRating(userRating: number) {
    if (!selectedMovie) return
    setSelectedMovie((movie) => {
      if (movie) return { ...movie, userRating }
    })
  }

  function handleAddSelectedToWatchlist(movie: MovieDetails | undefined) {
    if (!movie) return
    setWatchedList((wl) => [...wl, movie])
    setSelectedMovie(movie)
    // TODO: Implement a toast or notif to warn the user of adding their selected movie to the watchlist
  }

  function handleWatchlistMovieDeletion(imdbId: string) {
    const movieInfo = watchedList.find((movie) => movie.imdbId === imdbId)
    const isConfirmed = confirm(
      `Do you want to delete ${movieInfo?.title} (${movieInfo?.year}) from your watch list items?`,
    )

    if (isConfirmed) {
      handleSettingSelectedMovieUserRating(0)

      setWatchedList((movies) =>
        movies.filter((movie) => movie.imdbId !== imdbId),
      )
    }

    // TODO: Implement a toast or notif to warn the user of removing movie from watchlist
  }

  return (
    <div className="main__body">
      {error && error.type === 'network' ? (
        <NetworkFailure />
      ) : (
        <div className="box-container">
          <Box className={['movies-list']}>
            <MovieList
              searchQuery={searchQuery}
              onSetMovieCount={onSetMovieCount}
              onSetError={onSetError}
              onFetchSelected={handleFetchSelected}
            />
          </Box>

          <Box className={['watched-list']}>
            <WatchedListHeader watchedMovies={watchedList} />

            <WatchedList
              watchedMovies={watchedList}
              onFetchSelected={handleFetchSelected}
              onWatchlistMovieDeletion={handleWatchlistMovieDeletion}
            />

            <MovieModal
              watchedList={watchedList}
              currentMovie={selectedMovie}
              onCurrentMovieReset={() => setSelectedMovie(undefined)}
              onAddSelectedToWatchlist={handleAddSelectedToWatchlist}
              onWatchlistMovieDeletion={handleWatchlistMovieDeletion}
              onSettingSelectedMovieUserRating={
                handleSettingSelectedMovieUserRating
              }
            />
          </Box>
        </div>
      )}
    </div>
  )
}

export default MainBody
