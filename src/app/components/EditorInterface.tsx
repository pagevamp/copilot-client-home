'use client'

import When from '@/components/hoc/When'
import { useAppState } from '@/hooks/useAppState'

const EditorInterface = () => {
  const appState = useAppState()

  return (
    <>
      <When condition={appState?.appState.bannerImg !== ''}>
        <img
          className='h-56 object-cover w-full'
          src={appState?.appState.bannerImg as string}
          alt='banner image'
        />
      </When>
      <div
        className='px-5'
        style={{
          background: '#f8f9fb',
          height: '90vh',
        }}
      >
        EDITOR
      </div>
    </>
  )
}

export default EditorInterface
