import { FloatingMenu, Editor } from '@tiptap/react'
import { FC, ReactNode } from 'react'

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

import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils'
import { ImagePickerUtils } from '@/utils/imagePickerUtils'
import { useAppState } from '@/hooks/useAppState'

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
          <FloatingContainerBtn
            handleClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.toggleHeading(1)
            }}
            icon={<H1Icon />}
            label={'Heading 1'}
          />

          <FloatingContainerBtn
            handleClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.toggleHeading(2)
            }}
            icon={<H2Icon />}
            label={'Heading 2'}
          />

          <FloatingContainerBtn
            handleClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.toggleHeading(3)
            }}
            icon={<H3Icon />}
            label={'Heading 3'}
          />

          <FloatingContainerBtn
            handleClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.setParagraph()
            }}
            icon={<TextIcon />}
            label={'Text'}
          />

          <FloatingContainerBtn
            handleClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.insertContent('{{')
            }}
            icon={<AutofillIcon />}
            label={'Autofill fields'}
          />

          <FloatingContainerBtn
            handleClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.toggleBulletList()
            }}
            icon={<BulletListIcon />}
            label={'Bullet list'}
          />

          <FloatingContainerBtn
            handleClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.toggleNumberedList()
            }}
            icon={<NumberedListIcon />}
            label={'Numbered list'}
          />

          <FloatingContainerBtn
            handleClick={async () => {
              tiptapEditorUtils.clearCurrentLineContent()
              const file = await imagePickerUtils.selectImageFromLocalDrive()
              const imgUrl = await imagePickerUtils.imageUrl(file as File)
              tiptapEditorUtils.setImage(imgUrl as string)
            }}
            icon={<UploadIcon2 />}
            label={'Upload'}
          />

          <FloatingContainerBtn
            handleClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.insertCodeBlock()
            }}
            icon={<EmbedIcon />}
            label={'Embed'}
          />

          <FloatingContainerBtn
            handleClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              appState?.toggleShowLinkInput(true)
            }}
            icon={<LinkIcon />}
            label={'Link'}
          />

          <FloatingContainerBtn
            handleClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.insertTable({ rows: 3, cols: 3 })
            }}
            icon={<TableIcon />}
            label={'Table'}
          />

          <FloatingContainerBtn
            handleClick={() => {
              tiptapEditorUtils.clearCurrentLineContent()
              tiptapEditorUtils.insertCallout('')
            }}
            icon={<CalloutIcon />}
            label={'Callout'}
          />
        </div>
      </FloatingMenu>
    </>
  )
}

export default FloatingMenuContainer

const FloatingContainerBtn = ({
  handleClick,
  icon,
  label,
}: {
  handleClick: () => void
  icon: ReactNode
  label: string
}) => {
  return (
    <button
      className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'
      onClick={() => {
        handleClick()
      }}
    >
      <div>{icon}</div>
      <div>
        <p className='text-sm'>{label}</p>
      </div>
    </button>
  )
}
