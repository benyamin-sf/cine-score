function MovieAttributes({
  attrs,
}: Readonly<{ attrs: { emoji: string; desc: string }[] }>) {
  return (
    <ul className="movie-attributes">
      {attrs.map((attr, idx) => (
        <li key={idx}>
          <span>{attr.emoji}</span>
          {attr.desc}
        </li>
      ))}
    </ul>
  )
}

export default MovieAttributes
