'use client'

import When from '@/components/hoc/When'
import { useAppState } from '@/hooks/useAppState'
import { EditorContent } from "@tiptap/react"
import { useEditor } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'

const EditorInterface = () => {
  const appState = useAppState()

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          class: '',
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: '',
        },
      }),
      Text,
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  if (!editor) return null;

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
        className='px-8 py-2'
        style={{
          background: '#f8f9fb', //to be changed later with color picker
          height: '90vh',
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </>
  )
}

export default EditorInterface
