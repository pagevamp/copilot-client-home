import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import { AutofillMenu } from './AutofillMenu'
import { staticAutofillValues } from '@/utils/constants'

async function getCustomFields() {
  const res = await fetch(`/api/autofill`, {
    next: { revalidate: 0 },
  })
  const { autofillFields } = await res.json()

  return autofillFields
}

export const autofillMenuSuggestion = {
  items: async ({ query }: any) => {
    const customFields = await getCustomFields()

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
