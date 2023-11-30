import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { FC, ReactNode, useEffect, useState } from 'react'

import {
  CalloutIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  LinkIcon,
  TextIcon,
} from '@/icons'
import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils'
import { Editor } from '@tiptap/react'
import { useAppState } from '@/hooks/useAppState'

interface IBubbleMenuContainer {
  editor: Editor
}

const DropdownBubbleMenu: FC<IBubbleMenuContainer> = ({ editor }) => {
  const [selectedFormatter, setSelectedFormatter] = useState('Text')

  const tiptapEditorUtils = new TiptapEditorUtils(editor)

  const appState = useAppState()

  useEffect(() => {
    const parent = editor.state.selection.$anchor.parent
    const level = parent.attrs.level
    const name = parent.type.name

    if (name === 'heading' && level === 1) {
      setSelectedFormatter('Heading 1')
    }
    if (name === 'heading' && level === 2) {
      setSelectedFormatter('Heading 2')
    }
    if (name === 'heading' && level === 3) {
      setSelectedFormatter('Heading 3')
    }
    if (name === 'paragraph') {
      setSelectedFormatter('Text')
    }
    if (name === 'calloutComponent') {
      setSelectedFormatter('Callout')
    }
  }, [editor.state.selection.$anchor.parent])

  return (
    <Select
      labelId='formatter-select-label'
      id='formatter-select-id'
      value={selectedFormatter}
      defaultValue='Text'
      label='Text'
      onChange={(event: SelectChangeEvent) => {
        const { value } = event.target
        setSelectedFormatter(value as string)
        if (value === 'Heading 1') {
          tiptapEditorUtils.toggleHeading(1)
        }
        if (value === 'Heading 2') {
          tiptapEditorUtils.toggleHeading(2)
        }
        if (value === 'Heading 3') {
          tiptapEditorUtils.toggleHeading(3)
        }
        if (value === 'Text') {
          tiptapEditorUtils.setParagraph()
        }

        if (value === 'Link') {
          appState?.toggleShowLinkInput(true)
        }
        if (value === 'Unlink') {
          tiptapEditorUtils.unlink()
        }
        if (value === 'Callout') {
          const text = tiptapEditorUtils.getSelectedText()
          tiptapEditorUtils.insertCallout(text)
        }
      }}
      variant='standard'
      disableUnderline
    >
      <MenuItem value='Heading 1'>
        <BubbleDropdownBtnContainer icon={<H1Icon />} label={'Heading 1'} />
      </MenuItem>
      <MenuItem value='Heading 2'>
        <BubbleDropdownBtnContainer icon={<H2Icon />} label={'Heading 2'} />
      </MenuItem>
      <MenuItem value='Heading 3'>
        <BubbleDropdownBtnContainer icon={<H3Icon />} label={'Heading 3'} />
      </MenuItem>
      <MenuItem value='Text'>
        <BubbleDropdownBtnContainer icon={<TextIcon />} label={'Text'} />
      </MenuItem>
      <MenuItem value={editor.isActive('link') ? 'Unlink' : 'Link'}>
        <BubbleDropdownBtnContainer
          icon={<LinkIcon />}
          label={editor.isActive('link') ? 'Unlink' : 'Link'}
        />
      </MenuItem>
      <MenuItem value='Callout'>
        <BubbleDropdownBtnContainer icon={<CalloutIcon />} label={'Callout'} />
      </MenuItem>
    </Select>
  )
}

export default DropdownBubbleMenu

const BubbleDropdownBtnContainer = ({
  icon,
  label,
}: {
  icon: ReactNode
  label: string
}) => {
  return (
    <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
      <div>{icon}</div>
      <div>
        <p className='text-sm'>{label}</p>
      </div>
    </button>
  )
}
