import { BubbleMenu, Editor } from '@tiptap/react'
import { FC, useState } from 'react';
import * as Icons from '@/components/tiptap/floatingMenu/icons'
import { Divider, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils';

interface IBubbleMenuContainer {
  editor: Editor;
}

const BubbleMenuContainer: FC<IBubbleMenuContainer> = ({ editor }) => {
  const [selectedFormatter, setSelectedFormatter] = useState("Text")

  const tiptapEditorUtils = new TiptapEditorUtils(editor)

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} >
      <div className='flex flex-row border border-slate-200 rounded bg-white'>
        <Select
          labelId="formatter-select-label"
          id="formatter-select-id"
          value={selectedFormatter}
          defaultValue="Text"
          label="Text"
          onChange={(event: SelectChangeEvent) => {
            setSelectedFormatter(event.target.value as string)
          }}
          variant="standard"
          disableUnderline
        >
          <MenuItem value="Heading 1">
            <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
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

          <MenuItem value="Heading 2">
            <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
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

          <MenuItem value="Heading 3">
            <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
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

          <MenuItem value="Text">
            <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
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

          <MenuItem value="Autofill field">
            <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            >
              <div>
                <Icons.AutofillIcon />
              </div>
              <div>
                <p className='text-sm'>Autofill field</p>
              </div>
            </button>
          </MenuItem>
        </Select>

        <button className='py-3 px-4 bg-white'
          onClick={() => {
            tiptapEditorUtils.toggleBold()
          }}
        >
          B
        </button>

        <Divider flexItem orientation="vertical" />

        <button className='flex flex-row py-3 px-4 bg-white italic'
          onClick={() => {
            tiptapEditorUtils.toggleItalic()
          }}
        >
          i
        </button>

        <Divider flexItem orientation="vertical" />

        <button className='flex flex-row py-3 px-4 bg-white'
          onClick={() => {
            tiptapEditorUtils.toggleUnderline()
          }}
        >
          U
        </button>

        <Divider flexItem orientation="vertical" />

        <button className='flex flex-row py-3 px-4 bg-white'
          onClick={() => {
            tiptapEditorUtils.toggleStrike()
          }}
        >
          &#36;
        </button>

        <Divider flexItem orientation="vertical" />

        <button className='flex flex-row pt-4 px-4 bg-white' onClick={() => {
          tiptapEditorUtils.toggleBulletList()
        }}>
          <div>
            <Icons.BulletListIcon />
          </div>
        </button>

        <Divider flexItem orientation="vertical" />

        <button className='flex flex-row pt-4 px-4 bg-white align-center' onClick={() => {
          tiptapEditorUtils.toggleNumberedList()
        }}>
          <div>
            <Icons.NumberedListIcon />
          </div>
        </button>
      </div>
    </BubbleMenu>
  )
}

export default BubbleMenuContainer;
