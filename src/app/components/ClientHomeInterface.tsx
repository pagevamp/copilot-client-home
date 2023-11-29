'use client'

import { useEffect, useState } from 'react'

import AutofillFields from '@/components/autofillFields/AutofillFields'
import ImagePicker from '@/components/ImagePicker/ImagePicker'
import Select from '@/components/select/Select'

import { ImagePickerUtils } from '@/utils/imagePickerUtils'
import { useAppState } from '@/hooks/useAppState'

const ClientHomeInterface = () => {
  const appState = useAppState()

  const clients = appState?.appState.mockData
  const defaultValue = 'Preview mode off'

  const [dropdownSelectedValue, setDropdownSelectedValue] =
    useState(defaultValue)

  useEffect(() => {
    if (dropdownSelectedValue === defaultValue) {
      appState?.toggleReadOnly(false)
      appState?.setSelectedClient('')
    } else {
      appState?.toggleReadOnly(true)
      appState?.setSelectedClient(dropdownSelectedValue)
    }
  }, [dropdownSelectedValue])


  return (
    <div>
      <div className='p-4 flex items-center justify-between'>
        <p className='font-medium'>Preview mode</p>
        <Select
          name='Preview mode'
          customOptions={
            <>
              <div
                className={`hover:bg-slate-50 py-2 px-3 ${dropdownSelectedValue === defaultValue ? 'bg-slate-50' : ''
                  }`}
                onClick={() => setDropdownSelectedValue(defaultValue)}
              >
                {defaultValue}
              </div>
              {clients && clients.map((val, key) => {
                return (
                  <div
                    key={key}
                    className={`hover:bg-slate-50 py-2 px-3 ${dropdownSelectedValue === val.givenName ? 'bg-slate-50' : ''
                      }`}
                    onClick={() => setDropdownSelectedValue(val.givenName)}
                  >
                    {val.givenName}
                  </div>
                )
              })}
            </>
          }
          selected={dropdownSelectedValue}
        />
      </div>

      <hr className='bg-slate-300' style={{ padding: 0.5 }} />

      <ImagePicker
        getImage={async (image) => {
          const imagePickerUtils = new ImagePickerUtils()
          appState?.setBannerImg(
            (await imagePickerUtils.convertBlobToUrlString(
              image as Blob,
            )) as string,
          )
        }}
      />

      <hr className='bg-slate-300' style={{ padding: 0.3 }} />

      <AutofillFields />

      <hr className='bg-slate-300' style={{ padding: 0.5 }} />
    </div>
  )
}

export default ClientHomeInterface
