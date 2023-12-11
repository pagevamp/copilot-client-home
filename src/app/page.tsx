import EditorInterface from './components/EditorInterface'
import SideBarInterface from './components/SideBarInterface'

export const revalidate = 0

async function listClients() {
  const res = await fetch('https://api-beta.copilot.com/v1/clients?limit=100', {
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
  const res = await fetch('https://api-beta.copilot.com/v1/custom-fields', {
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
        <div className='basis-3/4 relative'>
          <EditorInterface />
        </div>
        <div className='basis-1/4 border-1 border-l border-slate-300'>
          <SideBarInterface
            clientList={clientList}
            customFields={customFields}
          />
        </div>
      </div>
    </div>
  )
}
