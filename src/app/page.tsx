import { copilotAPIUrl } from '@/config'
import EditorInterface from './components/EditorInterface'
import SideBarInterface from './components/SideBarInterface'

export const revalidate = 0

async function listClients() {
  const res = await fetch(`${copilotAPIUrl}/v1/clients?limit=100`, {
    headers: {
      'X-API-KEY': process.env.COPILOT_API_KEY as string,
    },
  })

  if (!res.ok) {
    throw new Error('Something went wrong while fetching client list!')
  }

  const { data } = await res.json()
  return data
}

async function getCustomFields() {
  const res = await fetch(`${copilotAPIUrl}/v1/custom-fields`, {
    headers: {
      'X-API-KEY': process.env.COPILOT_API_KEY as string,
    },
  })

  if (!res.ok) {
    throw new Error('Something went wrong while fetching client list!')
  }

  const { data } = await res.json()
  return data
}

// async function getSettings() {
//   const { data } = await fetch("http://localhost:3000/api/settings").then(res => res.json())
//   return data
// }
export default async function Page() {
  const clientList = await listClients()
  const customFields = await getCustomFields()

  return (
    <div>
      <div className='flex flex-row'>
        <div className='relative w-full'>
          <EditorInterface />
        </div>
        <div
          className='border-1 border-l border-slate-300 xl:hidden'
          style={{
            minWidth: '350px',
            maxWidth: '350px',
            wordWrap: 'break-word',
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
