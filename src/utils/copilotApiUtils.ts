import { copilotApi } from 'copilot-node-sdk'
import { DefaultService as Copilot } from 'copilot-node-sdk/codegen/api/services/DefaultService'
import {
  ClientResponse,
  ClientResponseSchema,
  ClientsResponseSchema,
  CompanyResponse,
  CompanyResponseSchema,
  CustomFieldResponse,
  CustomFieldResponseSchema,
  MeResponse,
  MeResponseSchema,
  Token,
  TokenSchema,
} from '@/types/common'
import { copilotAPIKey } from '@/config'

export type SDK = typeof Copilot & {
  getTokenPayload?: () => Promise<Token>
}

export class CopilotAPI {
  copilot: SDK

  constructor(apiToken: string) {
    this.copilot = copilotApi({
      apiKey: copilotAPIKey,
      token: apiToken,
    })
  }

  async me(): Promise<MeResponse> {
    //updated method here
    return MeResponseSchema.parse(await this.copilot.getUserInfo())
  }

  // Get parsed payload from token
  async getTokenPayload(): Promise<Token | undefined> {
    return TokenSchema.parse(await this.copilot.getTokenPayload?.())
  }

  async getClient(clientId: string): Promise<ClientResponse> {
    return ClientResponseSchema.parse(
      await this.copilot.retrieveAClient({ id: clientId }),
    )
  }

  async getClients() {
    return ClientsResponseSchema.parse(await this.copilot.listClients({}))
  }

  async getCompany(companyId: string): Promise<CompanyResponse> {
    return CompanyResponseSchema.parse(
      await this.copilot.retrieveACompany({ id: companyId }),
    )
  }

  async getCustomFields(): Promise<CustomFieldResponse> {
    return CustomFieldResponseSchema.parse(
      await this.copilot.listCustomFields(),
    )
  }
}
