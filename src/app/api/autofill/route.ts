import { copilotAPIKey, copilotAPIUrl } from '@/config'
import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch(`${copilotAPIUrl}/v1/custom-fields`, {
    headers: {
      'X-API-KEY': copilotAPIKey as string,
    },
  })

  const { data } = await res.json()
  return NextResponse.json({ autofillFields: data })
}
