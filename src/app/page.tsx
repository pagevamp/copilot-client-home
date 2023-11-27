import EditorInterface from './components/EditorInterface'
import SideBarInterface from './components/SideBarInterface'

export const revalidate = 0;

async function listClients() {
  const res = await fetch('https://api-beta.copilot.com/v1/clients?limit=100', {
    headers: {
      'X-API-KEY': process.env.COPILOT_API_KEY as string
    },
  })

  if (!res.ok) {
    throw new Error("Something went wrong while fetching client list!")
  }

  return res.json()
}


export default async function Page() {
  // const clientList = await listClients()

  return (
    <div>
      <div className='p-5'>
        <p className='font-medium'>Home</p>
      </div>
      <div className='flex flex-row'>
        <div className='basis-3/4'>
          <EditorInterface />
        </div>
<<<<<<< HEAD
        <div className='basis-1/4 border-t-2 border-l-2 border-slate-300'>
          <SideBarInterface />
=======
        <div className='basis-1/4 border-t-2 border-l-2 border-slate-300 rounded'>
          <ClientHomeInterface />
>>>>>>> 66f23a285501e5a2d25676da8ed0b6fb4f3580ca
        </div>
      </div>
    </div>
  )
}
