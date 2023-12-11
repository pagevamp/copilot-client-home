import { NextResponse } from 'next/server'

export async function GET() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': process.env.COPILOT_API_KEY as string,
    },
  }

  const res = await fetch(
    'https://api-beta.copilot.com/v1/custom-fields',
    options,
  )
  const { data } = await res.json()
  return NextResponse.json({ autofillFields: data })
}
