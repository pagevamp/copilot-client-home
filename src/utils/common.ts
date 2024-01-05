import { NextResponse } from 'next/server'
import { CopilotAPI } from './copilotApiUtils'
import { MeResponse } from '@/types/common'

export async function getCurrentUser(apiToken: string): Promise<MeResponse> {
  const copilotClient = new CopilotAPI(apiToken)

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
