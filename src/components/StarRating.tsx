import { useState } from 'react'

function StarRating({
  starsCount,
  presetRating,
  isStarsVisible,
  children,
  onSetRate,
}: Readonly<{
  starsCount: number
  presetRating: number | undefined
  isStarsVisible: boolean
  children: React.ReactNode
  onSetRate: (rating: number) => void
}>) {
  const [activeStar, setActiveStar] = useState(presetRating ?? 0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const NO_HOVER = 0

  function handleStarHover(starNum: number) {
    setHoveredStar(starNum)
  }

  function handleStarActivation(starNum: number) {
    const next = activeStar === starNum ? 0 : starNum
    setActiveStar(next)
    onSetRate(next)
  }

  return (
    <article className="rating-container">
      {isStarsVisible && (
        <div
          className="rating__stars"
          aria-label="Rating"
          onMouseLeave={() => handleStarHover(NO_HOVER)}
        >
          {Array.from({ length: starsCount }, (_, idx) => idx + 1).map(
            (idx) => {
              const isStarColored =
                hoveredStar === NO_HOVER
                  ? activeStar >= idx
                  : hoveredStar >= idx

              return (
                <button
                  key={idx}
                  role="slider"
                  aria-valuenow={idx}
                  aria-label={`Rate ${idx} out of ${starsCount} stars`}
                  className={isStarColored ? 'is-filled' : undefined}
                  onMouseEnter={() => handleStarHover(idx)}
                  onClick={() => handleStarActivation(idx)}
                >
                  <svg>
                    <use href="/star.svg" />
                  </svg>
                </button>
              )
            },
          )}
          <span>{hoveredStar ? hoveredStar : activeStar}</span>
        </div>
      )}
      {children}
    </article>
  )
}

export default StarRating
