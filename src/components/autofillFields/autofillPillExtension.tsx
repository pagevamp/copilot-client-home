import { Node, NodeType } from 'tiptap'
import { toggleBlockType } from 'tiptap-commands'

class AutofillPill extends Node {
  get name(): string {
    return 'autofillPill'
  }

  get schema(): NodeType {
    return {
      attrs: {
        dataId: {
          default: null,
        },
      },
      content: [
        {
          inline: 'span',
          attrs: {
            class: 'autofill-pill',
            'data-id': '',
            contenteditable: false,
          },
        },
      ],
      toDOM: (node) => ['p', 0],
      parseDOM: [
        {
          tag: 'p',
        },
      ],
    }
  }

  commands({ type }: { type: NodeType }): any {
    return (attrs: { dataId: string }) => toggleBlockType(type, attrs)
  }
}

export default AutofillPill
