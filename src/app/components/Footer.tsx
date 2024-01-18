'use client'

import { When } from '@/components/hoc/When'
import { useAppState } from '@/hooks/useAppState'
import { handleBannerImageUpload } from '@/utils/handleBannerImageUpload'
import { ImagePickerUtils } from '@/utils/imagePickerUtils'
import { useEffect } from 'react'

export const Footer = () => {
  const appState = useAppState()

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
    const data = await handleBannerImageUpload(
      imageFile as File,
      appState?.appState.token as string,
    )

    let payload = {}
    if (appState?.appState.bannerImgId) {
      payload = {
        backgroundColor: appState?.appState.editorColor,
        content: content,
        bannerImageId: data.id,
        token: appState?.appState.token,
      }
    } else {
      payload = {
        backgroundColor: appState?.appState.editorColor,
        content: content,
        token: appState?.appState.token,
      }
    }
    try {
      await fetch(`/api/settings?token=${appState?.appState.token}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      const res = await fetch(`/api/settings?token=${appState?.appState.token}`)
      const { data } = await res.json()
      if (data) {
        appState?.setOriginalTemplate(data.content)
        appState?.setSettings(data)
      }
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

  useEffect(() => {
    const t = setTimeout(() => {
      appState?.toggleChangesCreated(false)
    }, 50)

    return () => clearTimeout(t)
  }, [])

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
