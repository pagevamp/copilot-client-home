import { CopilotAPI, MeResponse } from './copilotApiUtils'

export async function getCurrentUser(): Promise<MeResponse> {
  if (!process.env.COPILOT_API_KEY) {
    throw new Error('Copilot API key is not set.')
  }
  const copilotClient = new CopilotAPI(process.env.COPILOT_API_KEY)

  return await copilotClient.me()
}