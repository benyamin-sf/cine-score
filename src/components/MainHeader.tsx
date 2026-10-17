function MainHeader({
  search,
  moviesCount,
  onSetSearch,
}: Readonly<{
  search: string
  moviesCount: number
  onSetSearch: (query: string) => void
}>) {
  return (
    <header className="main__header">
      <h1 className="header__heading">🍿 CineScore</h1>
      <label className="header__label visually-hidden" htmlFor="search-box">
        Type name of a movie, series, or episode...
      </label>

      <input
        id="search-box"
        className="header__search"
        type="search"
        placeholder="Interstellar"
        value={search}
        onChange={(e) => onSetSearch(e.target.value)}
      />

      {moviesCount === 0 && <p className="header__stats">Search now</p>}
      {moviesCount !== 0 && (
        <p className="header__stats">
          Found <span>{moviesCount}</span> top results
        </p>
      )}
    </header>
  )
}

export default MainHeader
