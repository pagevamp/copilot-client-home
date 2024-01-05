import { NextRequest, NextResponse } from 'next/server'
import { SettingService } from '@/app/api/settings/services/setting.service'
import { SettingRequestSchema } from '@/types/setting'
import { errorHandler, getCurrentUser } from '@/utils/common'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')
  if (!token) {
    errorHandler('Missing token', 422)
  }
  const settingService = new SettingService()
  const currentUser = await getCurrentUser(z.string().parse(token))
  const setting = await settingService.findByUserId(currentUser.id)

  return NextResponse.json(setting ? { data: setting } : { data: null })
}

export async function PUT(request: NextRequest) {
  const data = await request.json()
  const setting = SettingRequestSchema.safeParse(data)
  if (!setting.success) {
    return NextResponse.json(setting.error.issues)
  }
  const settingService = new SettingService()
  await settingService.save(setting.data)

  return NextResponse.json({})
}
