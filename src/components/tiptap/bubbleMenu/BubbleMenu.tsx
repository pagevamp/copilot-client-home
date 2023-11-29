import { BubbleMenu, Editor } from '@tiptap/react'
<<<<<<< HEAD
import { FC, useState } from 'react'
import * as Icons from '@/components/tiptap/floatingMenu/icons'
import { Divider, MenuItem, Select, SelectChangeEvent } from '@mui/material'
=======
import { FC, ReactNode } from 'react'
import { Divider } from '@mui/material'

import { BulletListIcon2, NumberedListIcon2 } from '@/icons'

import DropdownBubbleMenu from './DropdownBubbleMenu'
>>>>>>> e8f2d98d7c7559d1041521034cb27a474eafd65b
import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils'

interface IBubbleMenuContainer {
  editor: Editor
}

const BubbleMenuContainer: FC<IBubbleMenuContainer> = ({ editor }) => {
<<<<<<< HEAD
  const [selectedFormatter, setSelectedFormatter] = useState('Text')

=======
>>>>>>> e8f2d98d7c7559d1041521034cb27a474eafd65b
  const tiptapEditorUtils = new TiptapEditorUtils(editor)

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className='flex flex-row border border-slate-200 rounded bg-white'>
<<<<<<< HEAD
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
                <Icons.H1Icon />
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
                <Icons.H2Icon />
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
                <Icons.H3Icon />
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
                <Icons.TextIcon />
              </div>
              <div>
                <p className='text-sm'>Text</p>
              </div>
            </button>
          </MenuItem>

          <MenuItem value='Autofill field'>
            <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
              <div>
                <Icons.AutofillIcon />
              </div>
              <div>
                <p className='text-sm'>Autofill field</p>
              </div>
            </button>
          </MenuItem>
        </Select>

        <button
          className='py-3 px-4 bg-white'
          onClick={() => {
=======
        <DropdownBubbleMenu editor={editor} />

        <BubbleMenuBtnContainer
          icon={'B'}
          handleOnClick={() => {
>>>>>>> e8f2d98d7c7559d1041521034cb27a474eafd65b
            tiptapEditorUtils.toggleBold()
          }}
        />

        <Divider flexItem orientation='vertical' />

<<<<<<< HEAD
        <button
          className='flex flex-row py-3 px-4 bg-white italic'
          onClick={() => {
=======
        <BubbleMenuBtnContainer
          icon={'i'}
          handleOnClick={() => {
>>>>>>> e8f2d98d7c7559d1041521034cb27a474eafd65b
            tiptapEditorUtils.toggleItalic()
          }}
        />

        <Divider flexItem orientation='vertical' />

<<<<<<< HEAD
        <button
          className='flex flex-row py-3 px-4 bg-white'
          onClick={() => {
=======
        <BubbleMenuBtnContainer
          icon={'U'}
          handleOnClick={() => {
>>>>>>> e8f2d98d7c7559d1041521034cb27a474eafd65b
            tiptapEditorUtils.toggleUnderline()
          }}
        />

        <Divider flexItem orientation='vertical' />

<<<<<<< HEAD
        <button
          className='flex flex-row py-3 px-4 bg-white'
          onClick={() => {
=======
        <BubbleMenuBtnContainer
          icon={'$'}
          handleOnClick={() => {
>>>>>>> e8f2d98d7c7559d1041521034cb27a474eafd65b
            tiptapEditorUtils.toggleStrike()
          }}
        />

        <Divider flexItem orientation='vertical' />

<<<<<<< HEAD
        <button
          className='flex flex-row pt-4 px-4 bg-white'
          onClick={() => {
            tiptapEditorUtils.toggleBulletList()
          }}
        >
          <div>
            <Icons.BulletListIcon />
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
            <Icons.NumberedListIcon />
          </div>
        </button>
=======
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
>>>>>>> e8f2d98d7c7559d1041521034cb27a474eafd65b
      </div>
    </BubbleMenu>
  )
}

export default BubbleMenuContainer
<<<<<<< HEAD
=======

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
>>>>>>> e8f2d98d7c7559d1041521034cb27a474eafd65b
