import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Callout } from './Callout'

export default Node.create({
  name: 'calloutComponent',
  group: 'block',
  // content: 'inline*',
  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'callout',
      },
    ]
  },

  whitespace: 'normal',

  // addKeyboardShortcuts() {
  //   return {
  //     'Mod-Enter': () => {
  //       return this.editor
  //         .chain()
  //         .insertContentAt(this.editor.state.selection.head, {
  //           type: this.type.name,
  //         })
  //         .focus()
  //         .run()
  //     },
  //   }
  // },

  renderHTML({ HTMLAttributes }) {
    return ['callout', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Callout)
  },
})
