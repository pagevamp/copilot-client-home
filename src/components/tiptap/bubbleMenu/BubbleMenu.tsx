import { BubbleMenu, Editor } from '@tiptap/react'
import { FC, ReactNode } from 'react'
import { Divider } from '@mui/material'

import { BulletListIcon2, NumberedListIcon2 } from '@/icons'

import DropdownBubbleMenu from './DropdownBubbleMenu'
import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils'

interface IBubbleMenuContainer {
  editor: Editor
}

const BubbleMenuContainer: FC<IBubbleMenuContainer> = ({ editor }) => {
  const tiptapEditorUtils = new TiptapEditorUtils(editor)

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className='flex flex-row border border-slate-200 rounded bg-white'>
        <DropdownBubbleMenu editor={editor} />

        <BubbleMenuBtnContainer
          icon={'B'}
          handleOnClick={() => {
            tiptapEditorUtils.toggleBold()
          }}
        />

        <Divider flexItem orientation='vertical' />

        <BubbleMenuBtnContainer
          icon={'i'}
          handleOnClick={() => {
            tiptapEditorUtils.toggleItalic()
          }}
        />

        <Divider flexItem orientation='vertical' />

        <BubbleMenuBtnContainer
          icon={'U'}
          handleOnClick={() => {
            tiptapEditorUtils.toggleUnderline()
          }}
        />

        <Divider flexItem orientation='vertical' />

        <BubbleMenuBtnContainer
          icon={'$'}
          handleOnClick={() => {
            tiptapEditorUtils.toggleStrike()
          }}
        />

        <Divider flexItem orientation='vertical' />

        <BubbleMenuBtnContainer
          icon={<BulletListIcon2 />}
          handleOnClick={() => {
            tiptapEditorUtils.toggleBulletList()
          }}
          className={'pt-4'}
        />

        <Divider flexItem orientation='vertical' />

        <BubbleMenuBtnContainer
          icon={<NumberedListIcon2 />}
          handleOnClick={() => {
            tiptapEditorUtils.toggleNumberedList()
          }}
          className={'pt-4'}
        />
      </div>
    </BubbleMenu>
  )
}

export default BubbleMenuContainer

const BubbleMenuBtnContainer = ({
  icon,
  handleOnClick,
  className,
}: {
  icon: ReactNode
  handleOnClick: () => void
  className?: string
}) => {
  return (
    <button
      className={`flex flex-row py-3 px-4 bg-white align-center ${className}`}
      onClick={() => handleOnClick()}
    >
      <div>{icon}</div>
    </button>
  )
}
