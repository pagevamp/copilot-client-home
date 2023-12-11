import { useEffect, useRef, useState } from 'react'
import { ChromePicker, SketchPicker } from 'react-color'
import { When } from '@/components/hoc/When'
import { useAppState } from '@/hooks/useAppState'

const ColorPicker = () => {
  const [showPicker, setShowPicker] = useState(false)

  const appState = useAppState()

  const pickerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: unknown) => {
      //@ts-expect-error unknown typing
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className='py-600 px-500 border-1 border-b relative flex justify-between p-4 gap-3 z-0 items-center'
      ref={pickerRef}
    >
      <p className='font-medium'>Background color</p>
      <div className='flex gap-3'>
        <div
          className='border border-slate-200 rounded p-1 flex flex-col justify-center cursor-pointer'
          onClick={() => setShowPicker((prev) => !prev)}
        >
          <div
            style={{
              backgroundColor: `${appState?.appState.editorColor}`,
            }}
            className='w-5 h-5 rounded'
          ></div>
        </div>
        <div
          className='py-1.5 px-3.5 border border-slate-200 text-xs'
          onClick={() => setShowPicker((prev) => !prev)}
        >
          {appState?.appState.editorColor}
        </div>
      </div>

      <When condition={showPicker}>
        <div className='absolute right-[98px] top-1600'>
          <ChromePicker
            disableAlpha={true}
            color={appState?.appState.editorColor}
            onChange={(color) => {
              appState?.setEditorColor(color.hex)
            }}
          />
        </div>
      </When>
    </div>
  )
}

export default ColorPicker
