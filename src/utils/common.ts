import { NextResponse } from 'next/server'
import { CopilotAPI, MeResponse } from './copilotApiUtils'
import { copilotAPIKey } from '@/config'

export async function getCurrentUser(): Promise<MeResponse> {
  if (!copilotAPIKey) {
    throw new Error('Copilot API key is not set.')
  }
  const copilotClient = new CopilotAPI(copilotAPIKey)

  return await copilotClient.me()
}

export function errorHandler(message: string, status: number = 200) {
  return NextResponse.json(
    { message },
    {
      status,
    },
  )
}
