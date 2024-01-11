export const copilotAPIUrl = process.env.COPILOT_API_URL || ''
export const copilotAPIKey = process.env.COPILOT_API_KEY || ''
export const apiUrl =
  process.env.VERCEL_ENV === 'development'
    ? process.env.API_URL
    : `https://${process.env.VERCEL_URL}` || ''
