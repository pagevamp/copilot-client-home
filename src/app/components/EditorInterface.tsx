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
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import StarterKit from '@tiptap/starter-kit'
import BubbleMenuContainer from '@/components/tiptap/bubbleMenu/BubbleMenu'
import Underline from '@tiptap/extension-underline'

const EditorInterface = () => {
  const appState = useAppState()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Heading,
      Text,
      Underline,
      OrderedList.configure({
        itemTypeName: "listItem",
        keepMarks: true,
        keepAttributes: true,
        HTMLAttributes: {
          class: 'list-decimal',
          type: "1"
        }
      }),
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc',
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'w-5/12 h-60 object-cover'
        }
      }),
      Table.configure({
        resizable: true,
      }),
      TableCell,
      TableHeader,
      TableRow
    ],
    content: '',
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
          background: '#f8f9fb', //to be changed later with color picker component
          minHeight: '90vh',
        }}
      >
        {
          editor ? (
            <div>
              <FloatingMenuContainer editor={editor} />
              <BubbleMenuContainer editor={editor} />
            </div>
          ) : null
        }
        <EditorContent editor={editor} />
      </div>
    </>
  )
}

export default EditorInterface
