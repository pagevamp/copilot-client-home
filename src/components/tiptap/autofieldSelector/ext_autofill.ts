import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { AutofillComponent } from './AutofillComponent'

export const AutofillExtension = Node.create({
  name: 'autofillComponent',
  group: 'inline',
  content: 'text*',
  inline: true,

  parseHTML() {
    return [
      {
        tag: 'autofill',
      },
    ]
  },

  whitespace: 'normal',

  renderHTML({ HTMLAttributes }) {
    // return ['autofill', mergeAttributes(HTMLAttributes), 0]
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(AutofillComponent)
  },

  addAttributes() {
    return {
      class: {
        default: 'autofill-pill',
      },
    }
  },

  addOptions() {
    return {
      inline: true,
      HTMLAttributes: {},
    }
  },
})
