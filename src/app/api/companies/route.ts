import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const companyId = req.nextUrl.searchParams.get('companyId') as string

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': process.env.COPILOT_API_KEY as string,
    },
  }

  const res = await fetch(
    `https://api-beta.copilot.com/v1/companies/${companyId}`,
    options,
  )
  const company = await res.json()
  return NextResponse.json({ data: company })
}
