import type { MovieDetails } from '../types/movie'

export const loadWatchedListLocalStorage = (
  key: string,
): MovieDetails[] | undefined => {
  const watchedListString = localStorage.getItem(key)
  if (!watchedListString) return
  return JSON.parse(watchedListString)
}

export const saveWatchedListLocalStorage = (
  key: string,
  data: MovieDetails[],
) => {
  const watchedListString = JSON.stringify(data)
  localStorage.setItem(key, watchedListString)
}
