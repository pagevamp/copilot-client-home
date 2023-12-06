'use client'

import Handlebars from 'handlebars'
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
import { useEditor, EditorContent } from '@tiptap/react'
import { useEffect, useState } from 'react'
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
        placeholder: initialEditorContent,
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

  const [originalTemplate, setOriginalTemplate] = useState<string | undefined>()
  const [bannerImage, setBannerImage] = useState('')

  useEffect(() => {
    if (editor) {
      editor?.setEditable(!appState?.appState.readOnly as boolean)
    }
  }, [appState?.appState.readOnly, editor])

  useEffect(() => {
    if (appState?.appState.readOnly) {
      const template = Handlebars?.compile(originalTemplate || '')
      const _client = appState.appState.clientList.find(
        (el) => el.id === (appState.appState.selectedClient as IClient).id,
      )
      const client = {
        ..._client,
        company: appState?.appState.selectedClientCompanyName,
      }
      const c = template({ client: client })
      setTimeout(() => {
        editor?.chain().focus().setContent(c).run()
      })
    } else {
      setTimeout(() => {
        editor
          ?.chain()
          .focus()
          .setContent(originalTemplate as string)
          .run()
      })
    }
  }, [
    appState?.appState.selectedClient,
    appState?.appState.selectedClientCompanyName,
  ])

  useEffect(() => {
    if (appState?.appState.readOnly) return
    setOriginalTemplate(editor?.getHTML())
  }, [editor?.getJSON(), appState?.appState.readOnly])

  useEffect(() => {
    if (!appState?.appState.settings) return
    if (
      originalTemplate !== appState?.appState.settings.content ||
      appState?.appState.settings.backgroundColor !==
        appState?.appState.editorColor ||
      appState?.appState.settings.bannerImage.url !==
        appState?.appState.bannerImgUrl
    ) {
      appState?.toggleChangesCreated(true)
    } else {
      appState?.toggleChangesCreated(false)
    }
  }, [
    originalTemplate,
    appState?.appState.editorColor,
    appState?.appState.bannerImgUrl,
    appState?.appState.readOnly,
  ])

  useEffect(() => {
    if (!editor) return

    appState?.setEditor(editor)

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
  }, [editor])

  useEffect(() => {
    ;(async () => {
      appState?.setLoading(true)
      const res = await fetch(`/api/settings`)
      const { data } = await res.json()
      if (data) {
        setOriginalTemplate(data.content)
        appState?.setSettings(data)
      }
      appState?.setLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (!appState?.appState.settings) return
    editor
      ?.chain()
      .focus()
      .setContent((appState?.appState.settings as ISettings).content)
      .run()
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
      <div
        className={`overflow-y-auto overflow-x-hidden max-h-screen w-full ${
          appState?.appState.changesCreated && 'pb-10'
        }`}
      >
        <When condition={!!appState?.appState.bannerImgUrl}>
          <img className='w-full' src={bannerImage} alt='banner image' />
        </When>
        <div
          className='px-14 py-8'
          style={{
            background: `${appState?.appState.editorColor}`,
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
    </>
  )
}

export default EditorInterface
