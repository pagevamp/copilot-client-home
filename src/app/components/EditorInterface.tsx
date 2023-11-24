'use client'

import { useAppState } from '@/hooks/useAppState'
import { useEditor, EditorContent } from '@tiptap/react'

import Handlebars from "handlebars"

import When from '@/components/hoc/When'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Underline from '@tiptap/extension-underline'
import CodeBlock from '@tiptap/extension-code-block'
import Code from '@tiptap/extension-code'
import Link from '@tiptap/extension-link'
import CalloutExtension from '@/components/tiptap/callout/CalloutExtension'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Gapcursor from '@tiptap/extension-gapcursor'

import LinkInput from '@/components/tiptap/linkInput/LinkInput'
import FloatingMenuContainer from '@/components/tiptap/floatingMenu/FloatingMenu'
import BubbleMenuContainer from '@/components/tiptap/bubbleMenu/BubbleMenu'
import { useEffect, useState } from 'react'
import AutofieldSelector from '@/components/tiptap/autofieldSelector/AutofieldSelector'
import NoteDisplay from '@/components/display/NoteDisplay'

const EditorInterface = () => {
  const appState = useAppState()

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Heading,
      Text,
      Underline,
      Bold,
      Italic,
      Strike,
      CalloutExtension,
      Gapcursor,
      Link.extend({
        exitable: true,
      }),
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
      TableRow,
      TableCell,
      TableHeader,
      CodeBlock,
      Code
    ],
    content: '',
  })

  const [originalTemplate, setOriginalTemplate] = useState<string | undefined>()

  //both useEffects should be refactored once api is connected
  useEffect(() => {
    if (editor) {
      editor?.setEditable(!appState?.appState.readOnly as boolean)
    }
    setOriginalTemplate(editor?.getHTML())

  }, [appState?.appState.readOnly])

  useEffect(() => {
    if (appState?.appState.readOnly) {
      const template = Handlebars?.compile(originalTemplate ? originalTemplate : editor?.getHTML() || "")
      const mockData = appState.appState.mockData.filter(el => el.givenName === appState.appState.selectedClient)[0]
      const c = template({ client: mockData })
      editor?.chain().focus().setContent(c).run()
    } else {
      editor?.chain().focus().setContent(originalTemplate as string).run()
    }
  }, [appState?.appState.selectedClient])


  if (!editor) return null;


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
        {
          editor ? (
            <div>
              <FloatingMenuContainer editor={editor} />
              <BubbleMenuContainer editor={editor} />
              <LinkInput editor={editor} />
              <AutofieldSelector editor={editor} />
            </div>
          ) : null
        }
        <EditorContent
          editor={editor}
          readOnly={appState?.appState.readOnly}
        />
      </div>
      <When condition={!!appState?.appState.readOnly}>
        <div style={{
          width: "330px",
          margin: "0 auto",
          position: "sticky",
          bottom: "5em"
        }}>
          <NoteDisplay content="Edits cannot be made while in preview mode" />
        </div>
      </When>
    </div>
  )
}

export default EditorInterface
