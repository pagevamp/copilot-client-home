import { z } from 'zod'
import { MediaResponseSchema } from '@/types/media'

export const SettingRequestSchema = z.object({
  bannerImageId: z.string().nullable().optional(),
  backgroundColor: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  token: z.string(),
})
export type SettingRequest = z.infer<typeof SettingRequestSchema>

export const SettingResponseSchema = z.object({
  id: z.string(),
  backgroundColor: z.string().nullable(),
  content: z.string().nullable(),
  createdById: z.string().uuid(),
  bannerImage: MediaResponseSchema.nullable(),
})
export type SettingResponse = z.infer<typeof SettingResponseSchema>
