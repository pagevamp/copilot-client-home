'use client'

import LinkInput from '@/components/tiptap/linkInput/LinkInput'
import FloatingMenuContainer from '@/components/tiptap/floatingMenu/FloatingMenu'
import BubbleMenuContainer from '@/components/tiptap/bubbleMenu/BubbleMenu'
import AutofieldSelector from '@/components/tiptap/autofieldSelector/AutofieldSelector'
import { When } from '@/components/hoc/When'

import { useAppState } from '@/hooks/useAppState'
import { EditorContent } from '@tiptap/react'
import { useEffect } from 'react'

const EditorInterface = () => {
  const appState = useAppState()

  const editor = appState?.appState.editor

  console.log('editor', editor)

  useEffect(() => {
    if (editor) {
      editor?.setEditable(!appState?.appState.readOnly as boolean)
    }
  }, [appState?.appState.readOnly])

  if (!editor) return null

  return (
    <>
      <When condition={appState?.appState.bannerImg !== ''}>
        <img
          className='w-full'
          src={appState?.appState.bannerImg as string}
          alt='banner image'
        />
      </When>
      <div
        className='px-14 py-8 overflow-auto'
        style={{
          background: '#f8f9fb', //to be changed later with color picker component
          maxHeight: '91vh',
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
    </>
  )
}

export default EditorInterface
