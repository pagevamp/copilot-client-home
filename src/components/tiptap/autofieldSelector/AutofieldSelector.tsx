import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils';
import { FloatingMenu, Editor } from '@tiptap/react'
import { FC } from 'react';

interface IAutofieldSelector {
  editor: Editor;
}

const AutofieldSelector: FC<IAutofieldSelector> = ({ editor }) => {
  const tiptapEditorUtils = new TiptapEditorUtils(editor)

  return (
    <>
      <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}
        shouldShow={({ view }) => {
          //@ts-ignore
          const { $cursor } = view.state.selection;

          if ($cursor) {
            const { pos } = $cursor
            const charBeforeCursor = view.state.doc.textBetween(pos - 2, pos)

            return charBeforeCursor === '{{'

          }
          return false

        }} pluginKey="autofield-selector">

        <div className='flex flex-col gap-0.5 bg-white py-2 border border-new-card-border rounded shadow-vairant-1 absolute top-3 w-52'>
          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.insertContent("{{client.givenName}}")
            }}
          >	&#123;&#123;client.givenName&#125;&#125;</button>
          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.insertContent("{{client.familyName}}")
            }}
          >	&#123;&#123;client.familyName&#125;&#125;</button>
          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.insertContent("{{client.email}}")
            }}
          >	&#123;&#123;client.email&#125;&#125;</button>
          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.insertContent("{{client.company}}")
            }}
          >	&#123;&#123;client.company&#125;&#125;</button>
          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.insertContent("{{client.address}}")
            }}
          >	&#123;&#123;client.address&#125;&#125;</button>
        </div>

      </FloatingMenu>
    </>
  )
}

export default AutofieldSelector
