'use client'

import ImagePicker from '@/components/ImagePicker/ImagePicker'
import ColorPicker from '@/components/colorPicker/ColorPicker'
import AutofillFields from '@/components/autofillFields/AutofillFields'
import Select from '@/components/select/Select'
import { useAppState } from '@/hooks/useAppState'
import { ImagePickerUtils } from '@/utils/imagePickerUtils'
import { FC, useEffect, useState } from 'react'
import { IClient, ICustomField } from '@/types/interfaces'

interface IEditorInterface {
  clientList: IClient[]
  customFields: ICustomField[]
}

const SideBarInterface: FC<IEditorInterface> = ({
  clientList,
  customFields,
}) => {
  const appState = useAppState()

  const [showImage, setShowImage] = useState('')

  const defaultValue = 'Preview mode off'

  const [dropdownSelectedClient, setDropdownSelectedClient] = useState<
    IClient | string | null
  >(defaultValue)

  useEffect(() => {
    if (dropdownSelectedClient === defaultValue) {
      appState?.toggleReadOnly(false)
      appState?.setSelectedClient(null)
    } else {
      appState?.toggleReadOnly(true)
      appState?.setSelectedClient(dropdownSelectedClient as IClient)
    }
  }, [dropdownSelectedClient])

  useEffect(() => {
    if (clientList.length === 0 || customFields.length === 0) return

    appState?.setClientList(clientList)
    appState?.setCustomFields(customFields)
  }, [clientList, customFields])

  useEffect(() => {
    ;(async () => {
      const imagePickerUtils = new ImagePickerUtils()
      if (appState?.appState.bannerImgUrl instanceof Blob) {
        setShowImage(
          (await imagePickerUtils.convertBlobToUrlString(
            appState?.appState.bannerImgUrl,
          )) as string,
        )
      } else {
        setShowImage(appState?.appState.bannerImgUrl as string)
      }
    })()
  }, [appState?.appState.bannerImgUrl])

  return (
    <div>
      <div className='p-4 flex items-center justify-between'>
        <p className='font-medium'>Preview mode</p>
        <Select
          name='Preview mode'
          customOptions={
            <>
              <div
                className={`hover:bg-slate-50 py-2 px-3 ${
                  dropdownSelectedClient === defaultValue ? 'bg-slate-50' : ''
                }`}
                onClick={() => setDropdownSelectedClient(defaultValue)}
              >
                {defaultValue}
              </div>
              {appState?.appState.clientList &&
                appState?.appState.clientList.map((val, key) => {
                  return (
                    <div
                      key={key}
                      className={`hover:bg-slate-50 py-2 px-3 ${
                        dropdownSelectedClient === val.givenName
                          ? 'bg-slate-50'
                          : ''
                      }`}
                      onClick={() => setDropdownSelectedClient(val)}
                    >
                      {val.givenName}
                    </div>
                  )
                })}
            </>
          }
          selected={
            dropdownSelectedClient === defaultValue
              ? defaultValue
              : (dropdownSelectedClient as IClient).givenName
          }
        />
      </div>

      <hr className='bg-slate-300' style={{ padding: 0.1 }} />

      <ImagePicker
        showImage={showImage}
        getImage={async (image) => {
          appState?.setBannerImgUrl(image as Blob)
        }}
      />

      <hr />

      <ColorPicker />

      <hr className='bg-slate-300' style={{ padding: 0.1 }} />

      <AutofillFields />

      <hr className='bg-slate-300' style={{ padding: 0.1 }} />
    </div>
  )
}

export default SideBarInterface
