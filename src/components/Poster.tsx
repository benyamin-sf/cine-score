import { useState } from 'react'

function Poster({
  src,
  alt,
}: Readonly<{ key: React.Key; src: string; alt: string }>) {
  const fallback = '/movie-template.webp'
  const [imgSrc, setImgSrc] = useState(!src || src === 'N/A' ? fallback : src)

  return <img src={imgSrc} alt={alt} onError={() => setImgSrc(fallback)} />
}

export default Poster
