'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { useEffect, useRef, useState } from 'react'

import Handlebars from 'handlebars'
import { Scrollbars } from 'react-custom-scrollbars'
import CalloutExtension from '@/components/tiptap/callout/CalloutExtension'
import LinkpdfExtension from '@/components/tiptap/pdf/PdfExtension'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import { TableCell } from '@/components/tiptap/table/table-cell'
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
import Placeholder from '@tiptap/extension-placeholder'
import Mention from '@tiptap/extension-mention'
import FloatingCommandExtension from '@/components/tiptap/floatingMenu/floatingCommandExtension'
import Hardbreak from '@tiptap/extension-hard-break'
import { floatingMenuSuggestion } from '@/components/tiptap/floatingMenu/floatingMenuSuggestion'
import { autofillMenuSuggestion } from '@/components/tiptap/autofieldSelector/autofillMenuSuggestion'

import BubbleMenuContainer from '@/components/tiptap/bubbleMenu/BubbleMenu'
import LinkInput from '@/components/tiptap/linkInput/LinkInput'
import NoteDisplay from '@/components/display/NoteDisplay'
import { When } from '@/components/hoc/When'

import { useAppState } from '@/hooks/useAppState'
import { IClient, ISettings } from '@/types/interfaces'
import LoaderComponent from '@/components/display/Loader'
import { ImagePickerUtils } from '@/utils/imagePickerUtils'

const EditorInterface = () => {
  const appState = useAppState()

  const initialEditorContent = 'Type "/" for commands'

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
      LinkpdfExtension,
      Gapcursor,
      History,
      Hardbreak,
      FloatingCommandExtension.configure({
        suggestion: floatingMenuSuggestion,
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'bg-new-white-3 border-1 rounded-xl py-0.5 px-2',
        },
        suggestion: autofillMenuSuggestion,
        renderLabel({ node }) {
          return `${node.attrs.label ?? node.attrs.id}`
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          const headingPlaceholders: any = {
            1: 'Heading 1',
            2: 'Heading 2',
            3: 'Heading 3',
          }

          if (node.type.name === 'heading') {
            return headingPlaceholders[node.attrs.level]
          }

          return initialEditorContent
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
          class: 'object-cover',
        },
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'font-bold',
        },
      }),
      CodeBlock,
      Code,
    ],
    content: '',
  })

  // const [originalTemplate, setOriginalTemplate] = useState<string | undefined>(appState?.appState.originalTemplate)
  const [bannerImage, setBannerImage] = useState('')

  useEffect(() => {
    if (editor) {
      editor?.setEditable(!appState?.appState.readOnly as boolean)
    }
  }, [appState?.appState.readOnly, editor])

  useEffect(() => {
    if (appState?.appState.readOnly) {
      const template = Handlebars?.compile(
        appState?.appState.originalTemplate || '',
      )
      const _client = appState.appState.clientList.find(
        (el) => el.id === (appState.appState.selectedClient as IClient).id,
      )
      const client = {
        ..._client,
        company: appState?.appState.selectedClientCompanyName,
      }
      const c = template({ client })
      setTimeout(() => {
        editor?.chain().focus().setContent(c).run()
      })
    } else {
      setTimeout(() => {
        editor
          ?.chain()
          .focus()
          .setContent(appState?.appState.originalTemplate as string)
          .run()
      })
    }
  }, [
    appState?.appState.selectedClient,
    appState?.appState.selectedClientCompanyName,
  ])

  useEffect(() => {
    if (!appState?.appState.readOnly) {
      appState?.setOriginalTemplate(editor?.getHTML() as string)
    }
  }, [editor?.getHTML(), appState?.appState.readOnly])

  useEffect(() => {
    if (
      appState?.appState.settings &&
      editor &&
      appState?.appState.originalTemplate
    ) {
      if (
        appState?.appState.originalTemplate?.toString() !==
          appState?.appState.settings.content.toString() ||
        appState?.appState.settings.backgroundColor !==
          appState?.appState.editorColor ||
        appState?.appState.settings.bannerImage.url !==
          appState?.appState.bannerImgUrl
      ) {
        appState?.toggleChangesCreated(true)
      } else {
        appState?.toggleChangesCreated(false)
      }
    } else {
      appState?.toggleChangesCreated(false)
    }
  }, [
    appState?.appState.originalTemplate,
    appState?.appState.editorColor,
    appState?.appState.bannerImgUrl,
    appState?.appState.readOnly,
    editor,
  ])

  useEffect(() => {
    if (editor) {
      appState?.setEditor(editor)
      editor.chain().focus('start')

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.metaKey && event.key === 'z') {
          event.preventDefault() // Prevent the default behavior of Cmd+Z (e.g., browser undo)
          editor.chain().focus().undo().run() // Perform undo operation
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [editor])

  useEffect(() => {
    ;(async () => {
      appState?.setLoading(true)
      const res = await fetch(`/api/settings`)
      const { data } = await res.json()
      if (data) {
        appState?.setOriginalTemplate(data.content)
        appState?.setSettings(data)
      }
      appState?.setLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (!appState?.appState.settings) return
    setTimeout(() => {
      editor
        ?.chain()
        .focus()
        .setContent((appState?.appState.settings as ISettings).content)
        .run()
    })
    appState?.setEditorColor(
      (appState?.appState.settings as ISettings).backgroundColor,
    )
    appState?.setBannerImgUrl(
      (appState?.appState.settings as ISettings).bannerImage.url,
    )
  }, [appState?.appState.settings])

  useEffect(() => {
    ;(async () => {
      const imagePickerUtils = new ImagePickerUtils()
      if (appState?.appState.bannerImgUrl instanceof Blob) {
        setBannerImage(
          (await imagePickerUtils.convertBlobToUrlString(
            appState?.appState.bannerImgUrl,
          )) as string,
        )
      } else {
        setBannerImage(appState?.appState.bannerImgUrl as string)
      }
    })()
  }, [appState?.appState.bannerImgUrl])

  if (!editor) return null

  return (
    <>
      <When condition={appState?.appState.loading as boolean}>
        <LoaderComponent />
      </When>
      <Scrollbars
        autoHide={true}
        hideTracksWhenNotNeeded
        style={{
          height: '100vh',
          background: `${appState?.appState.editorColor}`,
          marginBottom: appState?.appState.changesCreated ? '60px' : '0px',
        }}
      >
        <div
          style={{
            background: `${appState?.appState.editorColor}`,
          }}
        >
          <When condition={!!appState?.appState.bannerImgUrl}>
            <img
              className='w-full object-fill xl:object-cover'
              src={bannerImage}
              alt='banner image'
              style={{
                height: '25vh',
              }}
            />
          </When>
          <div
            className='px-14 py-350 max-w-xl'
            style={{
              background: `${appState?.appState.editorColor}`,
              margin: '0 auto',
            }}
          >
            <div>
              <BubbleMenuContainer editor={editor} />
              <LinkInput editor={editor} />
            </div>

            <EditorContent
              editor={editor}
              readOnly={appState?.appState.readOnly}
            />
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
      </Scrollbars>
    </>
  )
}

export default EditorInterface
