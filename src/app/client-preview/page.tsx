import Handlebars from 'handlebars'
import { IClient, ISettings } from '@/types/interfaces'
import ClientPreview from '../components/ClientPreview'

export const revalidate = 0

async function getSettings(): Promise<ISettings> {
  const { data } = await fetch(`${process.env.API_URL}/api/settings`).then(
    (res) => res.json(),
  )
  return data
}

async function getClient(clientId: string): Promise<IClient> {
  const res = await fetch(
    `${process.env.API_URL}/api/client?clientId=${clientId}`,
  )
  const { data } = await res.json()
  return data
}

async function getCompany(companyId: string) {
  const res = await fetch(
    `${process.env.API_URL}/api/companies?companyId=${companyId}`,
  )
  const { data } = await res.json()
  return data
}

export default async function ClientPreviewPage() {
  const settings = await getSettings()

  //the clientId will be dynamic later
  const _client = await getClient('a2b66ac1-eedb-4b1c-8b6e-941b71583f3f')

  const company = await getCompany(_client.companyId)

  const template = Handlebars?.compile(settings.content)
  const client = {
    ..._client,
    company: company.name,
  }

  const htmlContent = template({ client: client })

  return (
    <div className={`overflow-y-auto overflow-x-hidden max-h-screen w-full`}>
      <img
        className='w-full'
        src={settings.bannerImage.url}
        alt='banner image'
      />
      <div
        className='px-14 py-8'
        style={{
          background: `${settings.backgroundColor}`,
        }}
      >
        <ClientPreview content={htmlContent} />
      </div>
    </div>
  )
}
