import lookup from 'country-code-lookup'

import type { MovieDetails } from '../types/movie'

import StarRating from './StarRating'
import ImdbIdContainer from './ImdbIdContainer'

function MovieModalBody({
  watchedList,
  currentMovie,
  onSettingSelectedMovieUserRating,
  onAddSelectedToWatchlist,
  onWatchlistMovieDeletion,
}: Readonly<{
  watchedList: MovieDetails[]
  currentMovie: MovieDetails
  onSettingSelectedMovieUserRating: (userRating: number) => void
  onAddSelectedToWatchlist: (movie: MovieDetails) => void
  onWatchlistMovieDeletion: (imdbId: string) => void
}>) {
  const isCurrentInWatchlist = watchedList.includes(currentMovie)

  return (
    <section className="selected__body">
      <h2>Description</h2>

      <p>{currentMovie?.plot}</p>

      <p>
        <span>Director:</span>
        {currentMovie?.directors.map((d, idx) => (
          <a
            key={idx}
            href={`https://en.wikipedia.org/wiki/${d.replaceAll(' ', '_')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {d}
            {currentMovie?.directors.length - 1 !== idx && ','}
          </a>
        ))}
      </p>

      <p>
        <span>Starring:</span>
        {currentMovie?.actors.map((a, idx) => (
          <WikiLink
            key={idx}
            actor={a}
            isLastItem={currentMovie?.actors.length - 1 !== idx}
          />
        ))}
      </p>

      <p>
        <span>Country:</span>
        {currentMovie?.country.length === 1 &&
          currentMovie?.country[0] === 'N/A' && <p>Not specified</p>}
      </p>
      {currentMovie?.country[0] !== 'N/A' && (
        <div className="selected__country">
          {currentMovie?.country.map((c, idx) => (
            <CountryFlag key={idx} country={c} />
          ))}
        </div>
      )}

      <StarRating
        key={`${currentMovie?.imdbId}-${currentMovie?.userRating}`}
        starsCount={10}
        presetRating={currentMovie?.userRating}
        isStarsVisible={!isCurrentInWatchlist}
        onSetRate={(userRating) => onSettingSelectedMovieUserRating(userRating)}
      >
        {isCurrentInWatchlist && (
          <p className="user-rating__txt">
            You've rated this movie as {currentMovie?.userRating} 🥳
          </p>
        )}

        {!isCurrentInWatchlist && currentMovie?.userRating !== 0 && (
          <button
            className="user-rating__btn"
            type="button"
            onClick={() => onAddSelectedToWatchlist(currentMovie)}
          >
            &#43; Add to watchlist
          </button>
        )}

        {isCurrentInWatchlist && (
          <button
            className="user-rating__btn user-rating__btn--delete"
            type="button"
            onClick={() => onWatchlistMovieDeletion(currentMovie.imdbId)}
          >
            &#8722; Remove to watchlist
          </button>
        )}
      </StarRating>

      <ImdbIdContainer imdbId={currentMovie?.imdbId} />
    </section>
  )
}

function WikiLink({
  actor,
  isLastItem,
}: Readonly<{ actor: string; isLastItem: boolean }>) {
  const wikipediaUrl = `https://en.wikipedia.org/wiki/${actor.replaceAll(' ', '_')}`

  return (
    <a href={wikipediaUrl} target="_blank" rel="noopener noreferrer">
      {actor}
      {!isLastItem && ','}
    </a>
  )
}

function CountryFlag({ country }: Readonly<{ country: string }>) {
  const countryFlagUrl = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.toLowerCase() === 'united kingdom' ? 'GB' : lookup.byCountry(country)?.internet}.svg`

  return (
    <span>
      <img src={countryFlagUrl} alt={`${country} flag`} />
      <p>{country}</p>
    </span>
  )
}

export default MovieModalBody
