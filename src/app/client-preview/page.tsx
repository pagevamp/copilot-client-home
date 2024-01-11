import Handlebars from 'handlebars'
import { IClient, ISettings } from '@/types/interfaces'
import ClientPreview from '../components/ClientPreview'
import { apiUrl } from '@/config'

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
  searchParams: { token: string }
}) {
  const { token } = searchParams
  const settings = await getSettings(token)

  //the clientId will be dynamic later
  const _client = await getClient('80ca5645-73e8-4a22-9bf5-cc5327355972', token)

  const company = await getCompany(_client.companyId, token)

  const template = Handlebars?.compile(settings.content)
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
      <img
        className='w-full object-fill xl:object-cover'
        src={settings.bannerImage.url}
        alt='banner image'
        style={{
          height: '25vh',
        }}
      />
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
