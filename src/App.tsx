import { useState } from 'react'

import type AppError from './types/Error'

import MainHeader from './components/MainHeader'
import MainBody from './components/MainBody'

export default function App() {
  const [searchQuery, setSearch] = useState('interstellar')
  const [moviesCount, setMoviesCount] = useState(0)
  const [error, setError] = useState<undefined | AppError>()

  return (
    <main id="main" className="main">
      <MainHeader
        search={searchQuery}
        moviesCount={moviesCount}
        onSetSearch={(query: string) => setSearch(query)}
      />

      <MainBody
        searchQuery={searchQuery}
        error={error}
        onSetMovieCount={(count: number) => setMoviesCount(count)}
        onSetError={(error: AppError | undefined) => setError(error)}
      />
    </main>
  )
}
