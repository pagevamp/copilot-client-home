export interface ISettings {
  content: string
  backgroundColor: string
  id: string
  bannerImage: string
  createdById: string
}

export interface IClient {
  id: string
  object: string
  createdAt: string
  givenName: string
  familyName: string
  email: string
  companyId: string
  status: string
  address: string
  inviteUrl: string
  firstLoginDate: string
  lastLoginDate: string
  lastActiveDate: string
  customFields: object
}

export interface ICustomField {
  id: string
  key: string
  name: string
  type: string
  order: number
  object: string
}
