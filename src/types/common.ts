import { z } from 'zod'

export const MeResponseSchema = z.object({
  id: z.string(),
  givenName: z.string(),
  familyName: z.string(),
  email: z.string(),
})
export type MeResponse = z.infer<typeof MeResponseSchema>

export const ClientResponseSchema = z.object({
  id: z.string(),
  givenName: z.string(),
  familyName: z.string(),
  email: z.string(),
  companyId: z.string(),
  customFields: z
    .record(
      z.string(),
      z.union([z.string().nullable(), z.array(z.string()).nullable()]),
    )
    .nullable(),
  avatarImageUrl: z.string().nullable(),
})
export type ClientResponse = z.infer<typeof ClientResponseSchema>

export const ClientsResponseSchema = z.object({
  data: z.array(ClientResponseSchema).nullable(),
})
export type ClientsResponse = z.infer<typeof ClientsResponseSchema>

export const CompanyResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  iconImageUrl: z.string(),
})
export type CompanyResponse = z.infer<typeof CompanyResponseSchema>

export const CustomFieldResponseSchema = z.object({
  data: z
    .array(
      z.object({
        id: z.string(),
        key: z.string(),
        name: z.string(),
        type: z.string(),
        order: z.number(),
        object: z.string(),
        options: z
          .array(
            z.object({
              id: z.string(),
              key: z.string(),
              label: z.string(),
              color: z.string(),
            }),
          )
          .optional(),
      }),
    )
    .nullable(),
})
export type CustomFieldResponse = z.infer<typeof CustomFieldResponseSchema>
