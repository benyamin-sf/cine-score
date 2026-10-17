import type { MovieDetails } from '../types/movie'
import Poster from './Poster'

import SitesRatings from './SitesRatings'

function MovieModalHeader({
  currentMovie,
  onCurrentMovieUnset,
}: Readonly<{ currentMovie: MovieDetails; onCurrentMovieUnset: () => void }>) {
  return (
    <header className="selected__header">
      <div className="selected__header-poster">
        <Poster
          key={currentMovie.imdbId}
          src={currentMovie?.poster}
          alt={`${currentMovie.title} poster`}
        />
        <p>{currentMovie?.rated}</p>
        <svg
          onClick={() => {
            document
              .querySelector('.movie-modal')
              ?.classList.remove('movie-modal--visible')
            setTimeout(onCurrentMovieUnset, 750)
          }}
        >
          <use href="/back.svg" />
        </svg>
      </div>

      <section className="selected__header-info">
        <h2>{currentMovie?.title}</h2>
        <div>
          <p>{currentMovie?.released}</p>
          &#10070;
          <p>
            {currentMovie?.duration}
            {currentMovie?.type === 'series' && '(each episode)'}
          </p>
        </div>

        <SitesRatings
          ratings={[
            {
              logo: '/imdb.svg',
              rating: currentMovie.imdbRating
                ? `${currentMovie.imdbRating}/10`
                : 'N/A',
            },
            {
              logo: '/rotten-tomatoes.svg',
              rating: currentMovie?.rottenTomatoesRating,
            },
            {
              logo: '/metacritics.svg',
              rating: currentMovie?.metacriticRating,
            },
          ]}
        />

        <ul>
          {currentMovie?.tags.map((tag, idx) => (
            <li key={idx}>{tag}</li>
          ))}
        </ul>
      </section>
    </header>
  )
}

export default MovieModalHeader
