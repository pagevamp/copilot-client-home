import { Editor, ReactRenderer, Range } from '@tiptap/react'
import tippy from 'tippy.js'

import { FloatingMenu } from './FloatingMenu'
import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils'
import { ImagePickerUtils } from '@/utils/imagePickerUtils'

export const floatingMenuSuggestion = {
  items: ({ query }: any) => {
    return [
      {
        title: 'Heading 1',
        command: ({ editor, range }: any) => {
          const tiptapEditorUtils = new TiptapEditorUtils(editor)
          tiptapEditorUtils.deleteRange(range)
          tiptapEditorUtils.toggleHeading(1)
        },
      },
      {
        title: 'Heading 2',
        command: ({ editor, range }: { editor: Editor; range: Range }) => {
          const tiptapEditorUtils = new TiptapEditorUtils(editor)
          tiptapEditorUtils.deleteRange(range)
          tiptapEditorUtils.toggleHeading(2)
        },
      },
      {
        title: 'Heading 3',
        command: ({ editor, range }: { editor: Editor; range: any }) => {
          const tiptapEditorUtils = new TiptapEditorUtils(editor)
          tiptapEditorUtils.deleteRange(range)
          tiptapEditorUtils.toggleHeading(3)
        },
      },
      {
        title: 'Text',
        command: ({ editor, range }: { editor: Editor; range: any }) => {
          const tiptapEditorUtils = new TiptapEditorUtils(editor)
          tiptapEditorUtils.deleteRange(range)
          tiptapEditorUtils.setParagraph()
        },
      },
      {
        title: 'Autofill Fields',
        command: ({ editor, range }: { editor: Editor; range: any }) => {
          const tiptapEditorUtils = new TiptapEditorUtils(editor)
          tiptapEditorUtils.deleteRange(range)
          tiptapEditorUtils.insertContent('{{')
        },
      },
      {
        title: 'Bullet List',
        command: ({ editor, range }: { editor: Editor; range: any }) => {
          const tiptapEditorUtils = new TiptapEditorUtils(editor)
          tiptapEditorUtils.deleteRange(range)
          tiptapEditorUtils.toggleBulletList()
        },
      },
      {
        title: 'Numbered List',
        command: ({ editor, range }: { editor: Editor; range: any }) => {
          const tiptapEditorUtils = new TiptapEditorUtils(editor)
          tiptapEditorUtils.deleteRange(range)
          tiptapEditorUtils.toggleNumberedList()
        },
      },
      {
        title: 'Upload',
        command: async ({ editor, range }: { editor: Editor; range: any }) => {
          const tiptapEditorUtils = new TiptapEditorUtils(editor)
          tiptapEditorUtils.deleteRange(range)
          const imagePickerUtils = new ImagePickerUtils()
          const file = await imagePickerUtils.selectImageFromLocalDrive()
          const imgUrl = await imagePickerUtils.imageUrl(file as File)
          tiptapEditorUtils.setImage(imgUrl as string)
        },
      },
      {
        title: 'Embed',
        command: ({ editor, range }: { editor: Editor; range: any }) => {
          const tiptapEditorUtils = new TiptapEditorUtils(editor)
          tiptapEditorUtils.deleteRange(range)
          tiptapEditorUtils.insertCodeBlock()
        },
      },
      {
        title: 'Link',
        command: ({ editor, range }: { editor: Editor; range: any }) => {
          const tiptapEditorUtils = new TiptapEditorUtils(editor)
          tiptapEditorUtils.deleteRange(range)
          // const appState = useAppState()
          // appState?.toggleShowLinkInput(true)
        },
      },
      {
        title: 'Table',
        command: ({ editor, range }: { editor: Editor; range: any }) => {
          const tiptapEditorUtils = new TiptapEditorUtils(editor)
          tiptapEditorUtils.deleteRange(range)
          tiptapEditorUtils.insertTable({ rows: 3, cols: 3 })
        },
      },
      {
        title: 'Callout',
        command: ({ editor, range }: { editor: Editor; range: any }) => {
          const tiptapEditorUtils = new TiptapEditorUtils(editor)
          tiptapEditorUtils.deleteRange(range)
          tiptapEditorUtils.insertCallout('')
        },
      },
    ]
      .filter((item) =>
        item.title
          .toLowerCase()
          .replace(' ', '')
          .startsWith(query.toLowerCase()),
      )
      .slice(0, 10)
  },

  render: () => {
    let component: any
    let popup: any

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(FloatingMenu, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props: any) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props: any) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}
