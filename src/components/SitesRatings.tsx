function SitesRatingSmall({
  logo,
  rating,
}: Readonly<{ logo: string; rating: string | undefined }>) {
  return (
    <div>
      <svg>
        <use href={logo} />
      </svg>
      <p>{!rating ? 'N/A' : rating}</p>
    </div>
  )
}

function SitesRatings({
  ratings,
}: Readonly<{ ratings: { rating: string | undefined; logo: string }[] }>) {
  return (
    <article className="sites-ratings">
      {ratings.map((obj, idx) => (
        <SitesRatingSmall key={idx} logo={obj.logo} rating={obj.rating} />
      ))}
    </article>
  )
}

export default SitesRatings
