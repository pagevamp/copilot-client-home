import { FloatingMenu, Editor } from '@tiptap/react'
import { FC } from 'react'

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
        <div className='flex flex-col gap-0.5 bg-white py-2 border border-new-card-border rounded shadow-vairant-1 absolute top-3 w-52'>
          <AutofieldButton label={'client.givenName'} />
          <AutofieldButton label={'client.firstName'} />
          <AutofieldButton label={'client.email'} />
          <AutofieldButton label={'client.company'} />
          <AutofieldButton label={'client.address'} />
        </div>
      </FloatingMenu>
    </>
  )
}

export default AutofieldSelector

const AutofieldButton = ({ label }: { label: string }) => {
  return (
    <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
      &#123;&#123;{label}&#125;&#125;
    </button>
  )
}
