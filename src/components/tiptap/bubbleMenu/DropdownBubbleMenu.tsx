import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { FC, useState } from 'react'

import { AutofillIcon, H1Icon, H2Icon, H3Icon, TextIcon } from '@/icons'
import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils'
import { Editor } from '@tiptap/react'

interface IBubbleMenuContainer {
  editor: Editor
}

const DropdownBubbleMenu: FC<IBubbleMenuContainer> = ({ editor }) => {
  const [selectedFormatter, setSelectedFormatter] = useState('Text')

  const tiptapEditorUtils = new TiptapEditorUtils(editor)

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
      <MenuItem value='Heading 1'>
        <button
          className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
          onClick={() => {
            tiptapEditorUtils.toggleHeading(1)
          }}
        >
          <div>
            <H1Icon />
          </div>
          <div>
            <p className='text-sm'>Heading 1</p>
          </div>
        </button>
      </MenuItem>

      <MenuItem value='Heading 2'>
        <button
          className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
          onClick={() => {
            tiptapEditorUtils.toggleHeading(2)
          }}
        >
          <div>
            <H2Icon />
          </div>
          <div>
            <p className='text-sm'>Heading 2</p>
          </div>
        </button>
      </MenuItem>

      <MenuItem value='Heading 3'>
        <button
          className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
          onClick={() => {
            tiptapEditorUtils.toggleHeading(3)
          }}
        >
          <div>
            <H3Icon />
          </div>
          <div>
            <p className='text-sm'>Heading 3</p>
          </div>
        </button>
      </MenuItem>

      <MenuItem value='Text'>
        <button
          className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
          onClick={() => {
            tiptapEditorUtils.setParagraph()
          }}
        >
          <div>
            <TextIcon />
          </div>
          <div>
            <p className='text-sm'>Text</p>
          </div>
        </button>
      </MenuItem>

      <MenuItem value='Autofill field'>
        <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
          <div>
            <AutofillIcon />
          </div>
          <div>
            <p className='text-sm'>Autofill field</p>
          </div>
        </button>
      </MenuItem>
    </Select>
  )
}

export default DropdownBubbleMenu
