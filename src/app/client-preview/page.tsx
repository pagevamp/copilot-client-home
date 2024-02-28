import Handlebars from 'handlebars'
import { IClient, ISettings } from '@/types/interfaces'
import ClientPreview from '../components/ClientPreview'
import { apiUrl } from '@/config'
import { defaultBannerImagePath } from '@/utils/constants'

export const revalidate = 0

async function getSettings(token: string) {
  const { data } = await fetch(`${apiUrl}/api/settings?token=${token}`).then(
    (res) => res.json(),
  )
  return data
}

async function getClient(clientId: string, token: string): Promise<IClient> {
  const res = await fetch(
    `${apiUrl}/api/client?clientId=${clientId}&token=${token}`,
  )
  if (!res.ok) {
    throw new Error(`No client found with '${token}' token`)
  }
  const { data } = await res.json()
  return data
}

async function getCompany(companyId: string, token: string) {
  const res = await fetch(
    `${apiUrl}/api/companies?companyId=${companyId}&token=${token}`,
  )

  const { data } = await res.json()
  return data
}

export default async function ClientPreviewPage({
  searchParams,
}: {
  searchParams: { token: string; clientId: string }
}) {
  const { token, clientId } = searchParams

  let settings: ISettings = {
    content: '',
    backgroundColor: '#ffffff',
    id: '',
    bannerImage: {
      id: '',
      url: '',
      filename: '',
      contentType: '',
      size: 0,
      createdById: '',
    },
    createdById: '',
  }

  const _settings = await getSettings(token)

  if (_settings) {
    settings = _settings
  }

  const _client = await getClient(clientId, token)

  const company = await getCompany(_client.companyId, token)

  const template = Handlebars?.compile(settings?.content)
  const client = {
    ..._client,
    company: company.name,
  }

  const htmlContent = template({ client })

  return (
    <div
      className={`overflow-y-auto overflow-x-hidden max-h-screen w-full`}
      style={{
        background: `${settings.backgroundColor}`,
      }}
    >
      {settings?.bannerImage?.url && (
        <img
          className='w-full object-fill xl:object-cover'
          src={!_settings ? defaultBannerImagePath : settings?.bannerImage.url}
          alt='banner image'
          style={{
            height: '25vh',
          }}
        />
      )}
      <div
        className='px-14 py-350 max-w-xl'
        style={{
          background: `${settings.backgroundColor}`,
          margin: '0 auto',
        }}
      >
        <ClientPreview content={htmlContent} />
      </div>
    </div>
  )
}
