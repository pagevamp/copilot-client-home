import { copilotAPIKey, copilotAPIUrl } from '@/config'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const clientId = req.nextUrl.searchParams.get('clientId') as string

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': copilotAPIKey as string,
    },
  }

  const res = await fetch(`${copilotAPIUrl}/v1/clients/${clientId}`, options)
  const client = await res.json()
  return NextResponse.json({ data: client })
}
