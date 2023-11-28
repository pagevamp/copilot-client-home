import { FloatingMenu, Editor } from '@tiptap/react'
import { FC } from 'react'

import FieldOptions from './FieldOptions'

interface IAutofieldSelector {
  editor: Editor
}

const AutofieldSelector: FC<IAutofieldSelector> = ({ editor }) => {
  return (
    <>
      <FloatingMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        shouldShow={({ view }) => {
          //@ts-expect-error shouldShow function's view prop should have $cursor property
          const { $cursor } = view.state.selection

          if ($cursor) {
            const { pos } = $cursor
            const charBeforeCursor = view.state.doc.textBetween(pos - 2, pos)

            return charBeforeCursor === '{{'
          }
          return false
        }}
        pluginKey='autofield-selector'
      >
        <FieldOptions />
      </FloatingMenu>
    </>
  )
}

export default AutofieldSelector
