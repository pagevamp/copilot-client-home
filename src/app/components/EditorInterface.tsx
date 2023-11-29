'use client'

import AutofieldSelector from '@/components/tiptap/autofieldSelector/AutofieldSelector'
import FloatingMenuContainer from '@/components/tiptap/floatingMenu/FloatingMenu'
import BubbleMenuContainer from '@/components/tiptap/bubbleMenu/BubbleMenu'
import LinkInput from '@/components/tiptap/linkInput/LinkInput'
import NoteDisplay from '@/components/display/NoteDisplay'
import { When } from '@/components/hoc/When'

import { useAppState } from '@/hooks/useAppState'
import { EditorContent } from '@tiptap/react'
import { useEffect } from 'react'

const EditorInterface = () => {
  const appState = useAppState()

  const editor = appState?.appState.editor

  console.log('editor', editor)

  //both useEffects should be refactored once api is connected
  useEffect(() => {
    if (editor) {
      editor?.setEditable(!appState?.appState.readOnly as boolean)
    }
  }, [appState?.appState.readOnly])

  if (!editor) return null

  return (
    <div className='overflow-y-auto overflow-x-hidden max-h-screen w-full'>
      <When condition={appState?.appState.bannerImg !== ''}>
        <img
          className='w-full'
          src={appState?.appState.bannerImg as string}
          alt='banner image'
        />
      </When>
      <div
        className='px-14 py-8'
        style={{
          background: '#f8f9fb', //to be changed later with color picker component
        }}
      >
        <div>
          <FloatingMenuContainer editor={editor} />
          <BubbleMenuContainer editor={editor} />
          <LinkInput editor={editor} />
          <AutofieldSelector editor={editor} />
        </div>
        <EditorContent editor={editor} readOnly={appState?.appState.readOnly} />
      </div>
      <When condition={!!appState?.appState.readOnly}>
        <div
          style={{
            width: '330px',
            margin: '0 auto',
            position: 'sticky',
            bottom: '5em',
          }}
        >
          <NoteDisplay content='Edits cannot be made while in preview mode' />
        </div>
      </When>
    </div>
  )
}

export default EditorInterface
