'use client'

import CalloutExtension from '@/components/tiptap/callout/CalloutExtension'
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
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Gapcursor from '@tiptap/extension-gapcursor'
import History from '@tiptap/extension-history'
import Mention from '@tiptap/extension-mention'
import FloatingCommandExtension from '@/components/tiptap/floatingMenu/floatingCommandExtension'
import { floatingMenuSuggestion } from '@/components/tiptap/floatingMenu/floatingMenuSuggestion'
import { autofillMenuSuggestion } from '@/components/tiptap/autofieldSelector/autofillMenuSuggestion'

import { EditorContent, useEditor } from '@tiptap/react'
import { useEffect } from 'react'

const ClientPreview = ({ content }: { content: string }) => {
  /**
   * Importing all the editor related imports and settings up this editor
   * in this route again is intentional. This is because client-preview is
   * a separate route which stays independent to the main route. Main route
   * will never load for client preview and thus editor will never load as well.
   */
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
      History,
      FloatingCommandExtension.configure({
        suggestion: floatingMenuSuggestion,
      }),
      Mention.configure({
        suggestion: autofillMenuSuggestion,
        renderLabel({ node }) {
          return `${node.attrs.label ?? node.attrs.id}`
        },
      }),
      Link.extend({
        exitable: true,
      }),
      OrderedList.configure({
        itemTypeName: 'listItem',
        keepMarks: true,
        keepAttributes: true,
        HTMLAttributes: {
          class: 'list-decimal',
          type: '1',
        },
      }),
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'w-5/12 h-60 object-cover',
        },
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlock,
      Code,
    ],
    content: '',
  })

  useEffect(() => {
    if (!editor) return
    editor.chain().focus().setContent(content).run()
    editor.setEditable(false)
  }, [editor])

  if (!editor) {
    return null
  }

  return <EditorContent editor={editor} readOnly={true} content={content} />
}

export default ClientPreview
