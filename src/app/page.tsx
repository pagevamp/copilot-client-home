import EditorInterface from './components/EditorInterface'
import SideBarInterface from './components/SideBarInterface'

export const revalidate = 0

// async function listClients() {
//   const res = await fetch('https://api-beta.copilot.com/v1/clients?limit=100', {
//     headers: {
//       'X-API-KEY': process.env.COPILOT_API_KEY as string,
//     },
//   })

//   if (!res.ok) {
//     throw new Error('Something went wrong while fetching client list!')
//   }

//   return res.json()
// }

// async function getSettings() {
//   const { data } = await fetch("http://localhost:3000/api/settings").then(res => res.json())
//   return data
// }
export default async function Page() {
  // const clientList = await listClients()
  // const settings = await getSettings()
  // console.log(settings)

  return (
    <div>
      <div className='flex flex-row'>
        <div className='basis-3/4 relative'>
          <EditorInterface />
        </div>
        <div className='basis-1/4 border-t-2 border-l-2 border-slate-300'>
          <SideBarInterface />
        </div>
      </div>
    </div>
  )
}
