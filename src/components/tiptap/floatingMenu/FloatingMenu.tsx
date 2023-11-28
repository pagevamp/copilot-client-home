import { FloatingMenu, Editor } from '@tiptap/react'
import { FC } from 'react'
import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils'
import { ImagePickerUtils } from '@/utils/imagePickerUtils'
import { useAppState } from '@/hooks/useAppState'
import {
  H1Icon,
  H2Icon,
  H3Icon,
  TextIcon,
  AutofillIcon,
  NumberedListIcon,
  BulletListIcon,
  UploadIcon2,
  CalloutIcon,
  LinkIcon,
  TableIcon,
  EmbedIcon,
} from '@/icons'

interface IFloatingMenuContainer {
  editor: Editor
}

const FloatingMenuContainer: FC<IFloatingMenuContainer> = ({ editor }) => {
  const tiptapEditorUtils = new TiptapEditorUtils(editor)
  const imagePickerUtils = new ImagePickerUtils()

  const appState = useAppState()

  return (
    <>
      <FloatingMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        shouldShow={({ view }) => {
          //@ts-expect-error shouldShow function's view prop should have $cursor property
          const { $cursor } = view.state.selection

          if ($cursor) {
            const { pos } = $cursor
            const charBeforeCursor = view.state.doc.textBetween(pos - 1, pos)

            return charBeforeCursor === '/'
          }
          return false
        }}
        pluginKey='optionsMenu'
      >
        <div className='flex flex-col gap-0.5 bg-white py-2 border border-new-card-border rounded shadow-vairant-1 absolute top-3 w-52'>
          <button
            className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
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

          <button
            className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
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

          <button
            className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
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

          <button
            className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
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

          <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
            <div>
              <AutofillIcon />
            </div>
            <div>
              <p className='text-sm'>Autofill fields</p>
            </div>
          </button>

          <button
            className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.toggleBulletList()
            }}
          >
            <div>
              <BulletListIcon />
            </div>
            <div>
              <p className='text-sm'>Bullest list</p>
            </div>
          </button>

          <button
            className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.toggleNumberedList()
            }}
          >
            <div>
              <NumberedListIcon />
            </div>
            <div>
              <p className='text-sm'>Numbered list</p>
            </div>
          </button>

          <button
            className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={async () => {
              tiptapEditorUtils.clearCurrentLineContent()
              const file = await imagePickerUtils.selectImageFromLocalDrive()
              const imgUrl = await imagePickerUtils.imageUrl(file as File)
              tiptapEditorUtils.setImage(imgUrl as string)
            }}
          >
            <div>
              <UploadIcon2 />
            </div>
            <div>
              <p className='text-sm'>Upload</p>
            </div>
          </button>

          <button
            className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.insertCodeBlock()
            }}
          >
            <div>
              <EmbedIcon />
            </div>
            <div>
              <p className='text-sm'>Embed</p>
            </div>
          </button>

          <button
            className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              appState?.toggleShowLinkInput(true)
            }}
          >
            <div>
              <LinkIcon />
            </div>
            <div>
              <p className='text-sm'>Link</p>
            </div>
          </button>

          <button
            className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.insertTable({ rows: 3, cols: 3 })
            }}
          >
            <div>
              <TableIcon />
            </div>
            <div>
              <p className='text-sm'>Table</p>
            </div>
          </button>

          <button
            className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
            onClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.insertCallout()
            }}
          >
            <div>
              <CalloutIcon />
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

export default FloatingMenuContainer
