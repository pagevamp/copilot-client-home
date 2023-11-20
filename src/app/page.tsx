import EditorInterface from './components/EditorInterface'
import SideBarInterface from './components/SideBarInterface'

export default async function Page() {
  return (
    <div>
      <div className='px-3.5 py-5'>
        <p className='font-medium'>Home</p>
      </div>
      <div className='flex flex-row'>
        <div className='basis-3/4'>
          <EditorInterface />
        </div>
        <div className='basis-1/4 border-t-2 border-l-2 border-slate-300'>
          <SideBarInterface />
        </div>
      </div>
    </div>
  )
}
