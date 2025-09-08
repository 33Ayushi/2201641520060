import { logInfo, logError } from './logger'

const STORAGE_KEY = 'shortenedUrls'

function loadUrls() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

function saveUrls(urls) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls))
}

export function shortenUrl(longUrl, validityMinutes = 30, customCode = '') {
  try {
    if (!/^https?:\/\//.test(longUrl)) {
      throw new Error('Invalid URL format')
    }

    let urls = loadUrls()
    let code = customCode || Math.random().toString(36).substring(2, 7)

    if (urls.find(u => u.code === code)) {
      throw new Error('Shortcode already exists')
    }

    const createdAt = Date.now()
    const expiresAt = createdAt + validityMinutes * 60000

    const newUrl = { code, longUrl, createdAt, expiresAt, clicks: [] }
    urls.push(newUrl)
    saveUrls(urls)

    logInfo('URL shortened', { code, longUrl })
    return newUrl
  } catch (err) {
    logError('shortenUrl failed', { error: err.message })
    throw err
  }
}

export function getAllUrls() {
  return loadUrls()
}

export function getUrlByCode(code) {
  return loadUrls().find(u => u.code === code)
}

export function registerClick(code, source = 'direct') {
  let urls = loadUrls()
  const index = urls.findIndex(u => u.code === code)
  if (index === -1) return null

  urls[index].clicks.push({
    timestamp: Date.now(),
    source,
    referrer: document.referrer || 'unknown'
  })

  saveUrls(urls)
  return urls[index]
}
