import { FloatingMenu, Editor } from '@tiptap/react'
import { FC } from 'react';
import * as Icons from '@/components/tiptap/floatingMenu/icons'
import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils';

interface IFloatingMenuContainer {
  editor: Editor;
}

const FloatingMenuContainer: FC<IFloatingMenuContainer> = ({ editor }) => {

  const tiptapEditorUtils = new TiptapEditorUtils(editor)


  return (
    <>
      <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}
        shouldShow={({ view }) => {
          //@ts-ignore
          const { $cursor } = view.state.selection;

          if ($cursor) {
            const { pos } = $cursor
            const charBeforeCursor = view.state.doc.textBetween(pos - 1, pos)

            return charBeforeCursor === '/'

          }
          return false

        }}>
        <div className='flex flex-col gap-0.5 bg-white py-2 border border-new-card-border rounded shadow-vairant-1 absolute top-3 w-52'>
          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
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

          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
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

          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
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

          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
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

          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
            <div>
              <Icons.AutofillIcon />
            </div>
            <div>
              <p className='text-sm'>Autofill fields</p>
            </div>
          </button>

          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.toggleBulletList()
            }}
          >
            <div>
              <Icons.BulletListIcon />
            </div>
            <div>
              <p className='text-sm'>Bullest list</p>
            </div>
          </button>

          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.toggleNumberedList()
            }}
          >
            <div>
              <Icons.NumberedListIcon />
            </div>
            <div>
              <p className='text-sm'>Numbered list</p>
            </div>
          </button>

          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
            <div>
              <Icons.UploadIcon />
            </div>
            <div>
              <p className='text-sm'>Upload</p>
            </div>
          </button>

          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
            <div>
              <Icons.EmbedIcon />
            </div>
            <div>
              <p className='text-sm'>Embed</p>
            </div>
          </button>

          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
            <div>
              <Icons.LinkIcon />
            </div>
            <div>
              <p className='text-sm'>Link</p>
            </div>
          </button>

          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
            <div>
              <Icons.TableIcon />
            </div>
            <div>
              <p className='text-sm'>Table</p>
            </div>
          </button>

          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
            <div>
              <Icons.CalloutIcon />
            </div>
            <div>
              <p className='text-sm'>Callout</p>
            </div>
          </button>
        </div>
      </FloatingMenu>
    </>
  )
}

export default FloatingMenuContainer;
