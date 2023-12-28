import { copilotAPIUrl } from '@/config'
import { NextResponse } from 'next/server'

export async function GET() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': copilotAPIUrl as string,
    },
  }

  const res = await fetch(`${copilotAPIUrl}/v1/custom-fields`, options)
  const { data } = await res.json()
  return NextResponse.json({ autofillFields: data })
}
