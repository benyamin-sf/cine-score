import { useEffect, useRef, useState } from 'react'

import type AppError from '../types/Error'
import type { Movie } from '../types/movie'

import { MovieListItem } from './MovieItems'

import { api } from '../api'
import { formatMovieList } from '../helpers/formatMovie'

let initialRenderDone = false

function MovieList({
  searchQuery,
  onSetMovieCount,
  onSetError,
  onFetchSelected,
}: Readonly<{
  searchQuery: string
  onSetMovieCount: (count: number) => void
  onSetError: (error: AppError | undefined) => void
  onFetchSelected: (imdbId: string) => Promise<void>
}>) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const timerId = useRef(0)

  useEffect(() => {
    async function fetchMovies() {
      if (searchQuery === '') return
      setIsLoading(true)

      try {
        const omdbSearchUrl = `?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${searchQuery}`
        const { data } = await api.get(omdbSearchUrl)
        const formattedData: Movie[] = formatMovieList(data?.Search)
        setMovies(formattedData)
        onSetMovieCount(data.totalResults)
        setIsLoading(false)
      } catch (err) {
        onSetError({
          msg: 'Failed to find relevant search results',
          type: 'network',
        })
        console.error('Failed to fetch the movie data:', err)
        // TODO: Show a toast or notification to inform user of failure
      } finally {
        initialRenderDone = true
      }
    }

    if (timerId.current !== 0) {
      clearTimeout(timerId.current)
      timerId.current = 0
    }

    timerId.current = setTimeout(fetchMovies, 1500)
  }, [searchQuery, onSetMovieCount, onSetError])

  if (!initialRenderDone || isLoading) {
    return (
      <ul className="movie-list">
        <div className="loader"></div>
      </ul>
    )
  }

  if (initialRenderDone && movies.length === 0) {
    return (
      <ul className="movie-list">
        <h4>
          Movie list is empty. 😰
          <br />
          Try searching for you favorites now...
        </h4>
      </ul>
    )
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieListItem
          key={movie.imdbId}
          movie={movie}
          onFetchSelected={onFetchSelected}
        />
      ))}
    </ul>
  )
}

export default MovieList
