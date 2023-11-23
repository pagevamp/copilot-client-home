'use client'

import ImagePicker from '@/components/ImagePicker/ImagePicker'
import AutofillFields from '@/components/autofillFields/AutofillFields'
import Select from '@/components/select/Select'
import { useAppState } from '@/hooks/useAppState'
import { ImagePickerUtils } from '@/utils/imagePickerUtils'
import { useEffect, useState } from 'react'

const ClientHomeInterface = () => {
  const appState = useAppState()

  const clients = ['Jimbo', 'Beanie dude', 'Beach guy']
  const defaultValue = 'Preview mode off'

  const [selected, setSelected] = useState(defaultValue)

  useEffect(() => {
    if (selected === defaultValue) {
      appState?.toggleReadOnly(false)
    } else {
      appState?.toggleReadOnly(true)
    }
  }, [selected])

  return (
    <div>
      <div className='p-4 flex items-center justify-between'>
        <p className='font-medium'>Preview mode</p>
        <Select
          name='Preview mode'
          customOptions={
            <>
              <div
                className={`hover:bg-slate-50 py-2 px-3 ${selected === defaultValue ? 'bg-slate-50' : ''
                  }`}
                onClick={() => setSelected(defaultValue)}
              >
                {defaultValue}
              </div>
              {clients.map((val, key) => {
                return (
                  <div
                    key={key}
                    className={`hover:bg-slate-50 py-2 px-3 ${selected === val ? 'bg-slate-50' : ''
                      }`}
                    onClick={() => setSelected(val)}
                  >
                    {val}
                  </div>
                )
              })}
            </>
          }
          selected={selected}
        />
      </div>

      <hr className='bg-slate-300' style={{ padding: 0.5 }} />

      <ImagePicker
        getImage={async (image) => {
          const imagePickerUtils = new ImagePickerUtils()
          appState?.setBannerImg(await imagePickerUtils.convertBlobToUrlString(image as Blob) as string)
        }}
      />

      <hr className='bg-slate-300' style={{ padding: 0.3 }} />

      <AutofillFields />

      <hr className='bg-slate-300' style={{ padding: 0.5 }} />
    </div>
  )
}

export default ClientHomeInterface
