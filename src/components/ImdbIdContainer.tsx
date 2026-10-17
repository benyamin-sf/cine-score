import { handleClipboardCopy } from '../helpers/clipboard'

function ImdbIdContainer({ imdbId }: Readonly<{ imdbId: string }>) {
  return (
    <div>
      <span>IMDB ID</span>
      <p>{imdbId}</p>
      <svg role="button" onClick={() => handleClipboardCopy(imdbId ?? '')}>
        <use href="/clipboard.svg" />
      </svg>
    </div>
  )
}

export default ImdbIdContainer
