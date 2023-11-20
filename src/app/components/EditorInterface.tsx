'use client'

import When from '@/components/hoc/When'
import { useAppState } from '@/hooks/useAppState'
import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import FloatingMenuContainer from '@/components/tiptap/floatingMenu/FloatingMenu'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'

const EditorInterface = () => {
  const appState = useAppState()

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Heading,
      Text,
      OrderedList.configure({
        itemTypeName: "listItem",
        keepMarks: true,
        keepAttributes: true,
        HTMLAttributes: {
          class: 'list-decimal',
          type: "a"
        }
      }),
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc',
        }
      })
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
        {
          editor ? (
            <div>
              <FloatingMenuContainer editor={editor} />
            </div>
          ) : null
        }
        <EditorContent editor={editor} />
      </div>
    </>
  )
}

export default EditorInterface
