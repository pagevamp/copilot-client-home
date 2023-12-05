'use client'

import { When } from '@/components/hoc/When'
import { useAppState } from '@/hooks/useAppState'
import { ImagePickerUtils } from '@/utils/imagePickerUtils'

export const Footer = () => {
  const appState = useAppState()

  const handleBannerImageUpload = async (imageFile: File) => {
    try {
      const formData = new FormData()
      formData.append('file', imageFile)
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })
      const { data } = await res.json()
      return data
      // appState?.setBannerImgId(data.id)
      // appState?.setBannerImgUrl(data.url)
    } catch (e) {
      console.error('Something went wrong!')
    }
  }

  const handleSave = async () => {
    appState?.setLoading(true)
    //get editor content
    const content = appState?.appState.editor?.getHTML()
    //upload banner image
    const imagePickerUtils = new ImagePickerUtils()
    const imageFile = await imagePickerUtils.blobToFile(
      appState?.appState.bannerImgUrl as Blob,
      'bannerImg',
    )
    const data = await handleBannerImageUpload(imageFile as File)

    let payload = {}
    if (appState?.appState.bannerImgId) {
      payload = {
        backgroundColor: appState?.appState.editorColor,
        content: content,
        bannerImageId: data.id,
      }
    } else {
      payload = {
        backgroundColor: appState?.appState.editorColor,
        content: content,
      }
    }
    try {
      await fetch(`/api/settings`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      appState?.setLoading(false)
      appState?.toggleChangesCreated(false)
    } catch (e) {
      console.error(e)
      appState?.setLoading(false)
    }
  }

  const handleCancel = async () => {
    if (appState?.appState.editor) {
      appState?.setEditorColor(
        appState.appState.settings?.backgroundColor as string,
      )
      appState?.appState.editor
        .chain()
        .focus()
        .setContent(appState?.appState.settings?.content as string)
        .run()
    }
    appState?.toggleChangesCreated(false)
  }

  return (
    <When
      condition={
        (appState?.appState.changesCreated as boolean) &&
        !appState?.appState.readOnly
      }
    >
      <div className='w-full flex flex-row justify-end gap-6 py-4 px-6 fixed bottom-0 bg-white'>
        <button
          className='py-1 px-3 text-new-dark rounded text-[13px] rounded bg-white border border-slate-300'
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className='bg-new-dark py-1 px-3 text-white text-[13px] rounded'
          onClick={handleSave}
        >
          Save changes
        </button>
      </div>
    </When>
  )
}