import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
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
import { useAppState } from '@/hooks/useAppState'

const FloatingContainerBtn = ({
  handleClick,
  label,
  focus,
}: {
  handleClick: () => void
  label: string
  focus: boolean
}) => {
  return (
    <button
      className={`flex flex-row gap-x-2.5 items-center py-1.5 px-3 cursor-pointer outline-none ${
        focus && 'bg-new-white-2'
      } display-block`}
      onClick={() => {
        handleClick()
      }}
    >
      <div>
        {label === 'Heading 1' ? (
          <H1Icon />
        ) : label === 'Heading 2' ? (
          <H2Icon />
        ) : label === 'Heading 3' ? (
          <H3Icon />
        ) : label === 'Text' ? (
          <TextIcon />
        ) : label === 'Autofill Fields' ? (
          <AutofillIcon />
        ) : label === 'Bullet List' ? (
          <BulletListIcon />
        ) : label === 'Numbered List' ? (
          <NumberedListIcon />
        ) : label === 'Upload' ? (
          <UploadIcon2 />
        ) : label === 'Embed' ? (
          <EmbedIcon />
        ) : label === 'Table' ? (
          <TableIcon />
        ) : label === 'Callout' ? (
          <CalloutIcon />
        ) : (
          <></>
        )}
      </div>
      <div>
        <p className='text-sm'>{label}</p>
      </div>
    </button>
  )
}

export const FloatingMenu = forwardRef((props: any, ref: any) => {
  const appState = useAppState()

  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: any) => {
    const item = props.items[index]

    if (item) {
      props.command({ id: item })
    }
  }

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length,
    )
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
    //handle link input here
    if (props.items[0].title === 'Link') {
      appState?.toggleShowLinkInput(true)
    }
  }

  useEffect(() => {
    setSelectedIndex(0)
  }, [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: any) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }

      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    },
  }))

  const { items } = props

  return (
    <div className='flex flex-col gap-0.5 bg-white py-2 border border-new-card-border rounded shadow-vairant-1 w-48 overflow-hidden relative'>
      {items && items?.length ? (
        items.map((item: any, index: any) => (
          <FloatingContainerBtn
            key={index}
            handleClick={() => {
              selectItem(index)
            }}
            label={item.title}
            focus={index === selectedIndex}
          />
        ))
      ) : (
        <FloatingContainerBtn
          label={'No Options'}
          handleClick={() => {}}
          focus={false}
        />
      )}
    </div>
  )
})

FloatingMenu.displayName = 'FloatingMenu'
