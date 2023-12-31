import { copilotAPIKey, copilotAPIUrl } from '@/config'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const companyId = req.nextUrl.searchParams.get('companyId') as string

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': copilotAPIKey as string,
    },
  }

  const res = await fetch(`${copilotAPIUrl}/v1/companies/${companyId}`, options)
  const company = await res.json()
  return NextResponse.json({ data: company })
}
