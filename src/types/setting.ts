import { z } from 'zod'

export const SettingRequestSchema = z.object({
  bannerImage: z.string().nullable().optional(),
  backgroundColor: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
})
export type SettingRequest = z.infer<typeof SettingRequestSchema>

export const SettingResponseSchema = z.object({
  id: z.string(),
  bannerImage: z.string().nullable(),
  backgroundColor: z.string().nullable(),
  content: z.string().nullable(),
  createdById: z.string().uuid(),
})
export type SettingResponse = z.infer<typeof SettingResponseSchema>
