import { apiUrl } from '@/config'
import EditorInterface from './components/EditorInterface'
import SideBarInterface from './components/SideBarInterface'
import { copilotApi } from 'copilot-node-sdk'

export const revalidate = 0

async function listClients(token: string) {
  console.log(`API URL: ${apiUrl}`)
  // @todo - Use SDK to fetch client list
  const copilotClient = copilotApi({ apiKey: token })
  const clientList = await copilotClient.listClients({})
  console.log('Client list through SDK', clientList.data)
  const res = await fetch(`${apiUrl}/api/clients?token=${token}`)

  if (!res.ok) {
    throw new Error('Something went wrong while fetching client list!')
  }

  const { data } = await res.json()
  return data
}

async function getCustomFields(token: string) {
  console.log(`API URL: ${apiUrl}`)
  const res = await fetch(`${apiUrl}/api/autofill?token=${token}`)

  if (!res.ok) {
    throw new Error('Something went wrong while fetching client list!')
  }

  const { autofillFields } = await res.json()
  return autofillFields
}

async function getSettings(token: string) {
  const res = await fetch(`${apiUrl}/api/settings?token=${token}`)

  if (!res.ok) {
    throw new Error('Something went wrong while fetching settings!')
  }

  const { data } = await res.json()

  return data
}
export default async function Page({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  const { token } = searchParams

  const clientList = await listClients(token)
  const customFields = await getCustomFields(token)
  const settings = await getSettings(token)

  return (
    <div>
      <div className='flex flex-row'>
        <div className='relative w-full'>
          <EditorInterface settings={settings} token={token} />
        </div>
        <div
          className='border-1 border-l border-slate-300 xl:hidden'
          style={{
            minWidth: '350px',
            maxWidth: '350px',
            wordWrap: 'break-word',
            height: '100vh',
          }}
        >
          <SideBarInterface
            clientList={clientList}
            customFields={customFields}
          />
        </div>
      </div>
    </div>
  )
}
