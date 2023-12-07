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
import { Formatter } from '@/types/interfaces'

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
      setSelectedFormatter(Formatter.h1)
    }
    if (name === 'heading' && level === 2) {
      setSelectedFormatter(Formatter.h2)
    }
    if (name === 'heading' && level === 3) {
      setSelectedFormatter(Formatter.h3)
    }
    if (name === 'paragraph') {
      setSelectedFormatter(Formatter.text)
    }
    if (name === 'calloutComponent') {
      setSelectedFormatter(Formatter.callout)
    }
  }, [editor.state.selection.$anchor.parent])

  return (
    <Select
      labelId='formatter-select-label'
      id='formatter-select-id'
      value={selectedFormatter}
      defaultValue={Formatter.text}
      label={Formatter.text}
      onChange={(event: SelectChangeEvent) => {
        const { value } = event.target
        setSelectedFormatter(value as string)
        if (value === Formatter.h1) {
          tiptapEditorUtils.toggleHeading(1)
        }
        if (value === Formatter.h2) {
          tiptapEditorUtils.toggleHeading(2)
        }
        if (value === Formatter.h3) {
          tiptapEditorUtils.toggleHeading(3)
        }
        if (value === Formatter.text) {
          tiptapEditorUtils.setParagraph()
        }

        if (value === Formatter.link) {
          appState?.toggleShowLinkInput(true)
        }
        if (value === Formatter.unlink) {
          tiptapEditorUtils.unlink()
        }
        if (value === Formatter.callout) {
          const text = tiptapEditorUtils.getSelectedText()
          tiptapEditorUtils.insertCallout(text)
        }
      }}
      variant='standard'
      disableUnderline
    >
      <MenuItem value={Formatter.h1}>
        <BubbleDropdownBtnContainer icon={<H1Icon />} label={Formatter.h1} />
      </MenuItem>
      <MenuItem value={Formatter.h2}>
        <BubbleDropdownBtnContainer icon={<H2Icon />} label={Formatter.h2} />
      </MenuItem>
      <MenuItem value={Formatter.h3}>
        <BubbleDropdownBtnContainer icon={<H3Icon />} label={Formatter.h3} />
      </MenuItem>
      <MenuItem value={Formatter.text}>
        <BubbleDropdownBtnContainer
          icon={<TextIcon />}
          label={Formatter.text}
        />
      </MenuItem>
      <MenuItem
        value={
          editor.isActive(Formatter.link)
            ? `${Formatter.unlink}`
            : `${Formatter.link}`
        }
      >
        <BubbleDropdownBtnContainer
          icon={<LinkIcon />}
          label={
            editor.isActive(Formatter.link)
              ? `${Formatter.unlink}`
              : `${Formatter.link}`
          }
        />
      </MenuItem>
      <MenuItem value={Formatter.callout}>
        <BubbleDropdownBtnContainer
          icon={<CalloutIcon />}
          label={Formatter.callout}
        />
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
