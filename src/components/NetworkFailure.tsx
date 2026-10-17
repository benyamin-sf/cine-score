function NetworkFailure() {
  return (
    <div className="network-failure">
      <svg>
        <use href="/connection-lost.svg" />
      </svg>
      <div>
        <h2>
          The <span>box office</span> seems to be closed already!
        </h2>
        <p>Failed to fetch movie data... Try again later.</p>
      </div>
    </div>
  )
}

export default NetworkFailure
