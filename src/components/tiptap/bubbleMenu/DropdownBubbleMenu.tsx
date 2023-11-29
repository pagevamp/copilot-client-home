import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { FC, ReactNode, useState } from 'react'

import { H1Icon, H2Icon, H3Icon, LinkIcon, TextIcon } from '@/icons'
import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils'
import { Editor } from '@tiptap/react'
import { useAppState } from '@/hooks/useAppState'

interface IBubbleMenuContainer {
  editor: Editor
}

const DropdownBubbleMenu: FC<IBubbleMenuContainer> = ({ editor }) => {
  const [selectedFormatter, setSelectedFormatter] = useState('')

  const tiptapEditorUtils = new TiptapEditorUtils(editor)

  const appState = useAppState()

  return (
    <Select
      labelId='formatter-select-label'
      id='formatter-select-id'
      value={selectedFormatter}
      defaultValue='Text'
      label='Text'
      onChange={(event: SelectChangeEvent) => {
        setSelectedFormatter(event.target.value as string)
      }}
      variant='standard'
      disableUnderline
    >
      <BubbleDropdownBtnContainer
        handleClick={() => tiptapEditorUtils.toggleHeading(1)}
        icon={<H1Icon />}
        label={'Heading 1'}
      />

      <BubbleDropdownBtnContainer
        handleClick={() => tiptapEditorUtils.toggleHeading(2)}
        icon={<H2Icon />}
        label={'Heading 2'}
      />

      <BubbleDropdownBtnContainer
        handleClick={() => tiptapEditorUtils.toggleHeading(3)}
        icon={<H3Icon />}
        label={'Heading 3'}
      />

      <BubbleDropdownBtnContainer
        handleClick={() => tiptapEditorUtils.setParagraph()}
        icon={<TextIcon />}
        label={'Text'}
      />

      <BubbleDropdownBtnContainer
        handleClick={() => {
          editor.isActive('link') ?
            tiptapEditorUtils.unlink() :
            appState?.toggleShowLinkInput(true)

        }}
        icon={<LinkIcon />}
        label={editor.isActive('link') ? "Unlink" : "Link"}
      />
    </Select>
  )
}

export default DropdownBubbleMenu

const BubbleDropdownBtnContainer = ({
  icon,
  handleClick,
  label,
}: {
  icon: ReactNode
  handleClick: () => void
  label: string
}) => {
  return (
    <MenuItem value={label}>
      <button
        className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
        onClick={() => handleClick()}
      >
        <div>{icon}</div>
        <div>
          <p className='text-sm'>{label}</p>
        </div>
      </button>
    </MenuItem>
  )
}
