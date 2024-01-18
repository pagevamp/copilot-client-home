import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import { AutofillMenu } from './AutofillMenu'
import { staticAutofillValues } from '@/utils/constants'
import { ICustomField } from '@/types/interfaces'

async function getCustomFields(token: string) {
  const res = await fetch(`/api/autofill?token=${token}`, {
    next: { revalidate: 0 },
  })
  const { autofillFields } = await res.json()

  return autofillFields
}

let customFields: ICustomField[] = []

const token = new URLSearchParams(document?.location?.search).get('token')
;(async () => {
  customFields = await getCustomFields(token || '')
})()

export const autofillMenuSuggestion = {
  items: async ({ query }: any) => {
    return [
      ...staticAutofillValues,
      ...customFields.map((el: any) => `{{client.customFields.${el.key}}}`),
    ]

      .filter((item: any) =>
        item.toLowerCase().replaceAll('{{', '').startsWith(query.toLowerCase()),
      )
      .slice(0, 10)
  },

  char: '{{',

  render: () => {
    let component: any
    let popup: any

    return {
      addAttributes() {
        return {
          customFields: {
            default: [],
          },
        }
      },

      onStart: (props: any) => {
        component = new ReactRenderer(AutofillMenu, {
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

        return component?.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}
