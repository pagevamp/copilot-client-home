import { BubbleMenu, Editor } from '@tiptap/react'
import { FC } from 'react'
import { Divider } from '@mui/material'
import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils'
import { BulletListIcon2, NumberedListIcon2 } from '@/icons'
import DropdownBubbleMenu from './DropdownBubbleMenu'

interface IBubbleMenuContainer {
  editor: Editor
}

const BubbleMenuContainer: FC<IBubbleMenuContainer> = ({ editor }) => {
  const tiptapEditorUtils = new TiptapEditorUtils(editor)

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className='flex flex-row border border-slate-200 rounded bg-white'>
        <DropdownBubbleMenu editor={editor} />

        <button
          className='py-3 px-4 bg-white'
          onClick={() => {
            tiptapEditorUtils.toggleBold()
          }}
        >
          B
        </button>

        <Divider flexItem orientation='vertical' />

        <button
          className='flex flex-row py-3 px-4 bg-white italic'
          onClick={() => {
            tiptapEditorUtils.toggleItalic()
          }}
        >
          i
        </button>

        <Divider flexItem orientation='vertical' />

        <button
          className='flex flex-row py-3 px-4 bg-white'
          onClick={() => {
            tiptapEditorUtils.toggleUnderline()
          }}
        >
          U
        </button>

        <Divider flexItem orientation='vertical' />

        <button
          className='flex flex-row py-3 px-4 bg-white'
          onClick={() => {
            tiptapEditorUtils.toggleStrike()
          }}
        >
          &#36;
        </button>

        <Divider flexItem orientation='vertical' />

        <button
          className='flex flex-row pt-4 px-4 bg-white'
          onClick={() => {
            tiptapEditorUtils.toggleBulletList()
          }}
        >
          <div>
            <BulletListIcon2 />
          </div>
        </button>

        <Divider flexItem orientation='vertical' />

        <button
          className='flex flex-row pt-4 px-4 bg-white align-center'
          onClick={() => {
            tiptapEditorUtils.toggleNumberedList()
          }}
        >
          <div>
            <NumberedListIcon2 />
          </div>
        </button>
      </div>
    </BubbleMenu>
  )
}

export default BubbleMenuContainer
