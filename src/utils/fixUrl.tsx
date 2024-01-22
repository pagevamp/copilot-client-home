export const fixUrl = (url: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i',
  )

  // Check if the URL matches the pattern
  const match = url.match(pattern)

  if (match) {
    // If it's missing "https://" or "http://", add "https://"
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = 'https://' + url
    }

    // If "www" is present with only one or two 'w's, correct it to three 'w's
    url = url.replace(/^(https?:\/\/)w{1,2}\./, '$1www.')

    return url
  } else {
    // If the URL doesn't match the pattern, consider it invalid and try to fix it
    // You can customize this part based on your needs
    url = 'https://' + url // Add "https://" assuming it's missing
    url = url.replace(/^(https?:\/\/)w{1,2}\./, '$1www.') // Correct "www" if needed
    return url
  }
}
