const LOG_KEY = 'appLogs'

function saveLog(entry) {
  const logs = JSON.parse(localStorage.getItem(LOG_KEY) || '[]')
  logs.push({ ...entry, time: new Date().toISOString() })
  localStorage.setItem(LOG_KEY, JSON.stringify(logs))
}

export function logInfo(message, data = {}) {
  saveLog({ level: 'info', message, data })
}

export function logError(message, data = {}) {
  saveLog({ level: 'error', message, data })
}

export function getLogs() {
  return JSON.parse(localStorage.getItem(LOG_KEY) || '[]')
}
