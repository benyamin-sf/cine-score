export async function handleClipboardCopy(text: string) {
  try {
    navigator.clipboard.writeText(text)
    // TODO: Implement a toast or notif to warn the user of copying the imdb id
  } catch {
    console.error('Failed to copy imdb id to clipboard.')
    // TODO: Same here in case of failure!
  }
}
