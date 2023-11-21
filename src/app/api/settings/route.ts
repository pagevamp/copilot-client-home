import { NextRequest, NextResponse } from 'next/server'
import { SettingService } from '@/app/api/settings/services/setting.service'
import { SettingRequestSchema } from '@/types/setting'
import { getCurrentUser } from '@/utils/common'

export async function GET() {
  const settingService = new SettingService()
  const currentUser = await getCurrentUser()
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
