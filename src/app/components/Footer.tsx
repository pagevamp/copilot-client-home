'use client'

import { When } from '@/components/hoc/When'
import { apiUrl } from '@/config'
import { useAppState } from '@/hooks/useAppState'
import { handleBannerImageUpload } from '@/utils/handleBannerImageUpload'
import { ImagePickerUtils } from '@/utils/imagePickerUtils'
import { useEffect } from 'react'

export const Footer = () => {
  const appState = useAppState()

  const saveUtility = async (payload: any) => {
    try {
      await fetch(`/api/settings?token=${appState?.appState?.token}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      const res = await fetch(
        `/api/settings?token=${appState?.appState?.token}`,
      )
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

  const handleSave = async () => {
    appState?.setLoading(true)
    //get editor content
    const content = appState?.appState.editor?.getHTML()

    let payload = {}

    if (
      appState?.appState?.settings?.bannerImage?.url ===
      '/images/default_banner.png'
    ) {
      const imagePickerUtils = new ImagePickerUtils()
      const imageResponse = await fetch(`/images/default_banner.png`)
      const imageBlob = await imageResponse.blob()
      const imageFile = await imagePickerUtils.blobToFile(
        imageBlob,
        'bannerImg',
      )
      const data = await handleBannerImageUpload(
        imageFile as File,
        appState?.appState.token as string,
      )
      payload = {
        backgroundColor: appState?.appState.editorColor,
        content: content,
        bannerImageId: data?.id,
        token: appState?.appState.token,
      }
      saveUtility(payload)
      return
    }

    if (!appState?.appState.bannerImgUrl) {
      payload = {
        backgroundColor: appState?.appState?.editorColor,
        content: content,
        token: appState?.appState.token,
        bannerImageId: null,
      }
      await fetch(`/api/media`, {
        method: 'DELETE',
        body: JSON.stringify({
          url: appState?.appState?.settings?.bannerImage?.url,
          token: appState?.appState?.token,
        }),
      })
      saveUtility(payload)
      return
    }

    if (
      appState?.appState.bannerImgUrl !==
      appState?.appState.settings?.bannerImage?.url
    ) {
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
      payload = {
        backgroundColor: appState?.appState.editorColor,
        content: content,
        bannerImageId: data?.id,
        token: appState?.appState.token,
      }
    } else {
      payload = {
        backgroundColor: appState?.appState?.editorColor,
        content: content,
        token: appState?.appState.token,
      }
    }
    saveUtility(payload)
  }

  const handleCancel = async () => {
    if (appState?.appState.editor) {
      appState?.setEditorColor(
        appState.appState.settings?.backgroundColor as string,
      )
      appState?.appState.editor
        .chain()
        .focus()
        .setContent(appState?.appState?.settings?.content as string)
        .run()
    }
    appState?.setBannerImgUrl(
      appState?.appState.settings?.bannerImage?.url || '',
    )
    appState?.setBannerImgId(appState?.appState.settings?.bannerImage?.id || '')
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
      <div className='w-full flex flex-row justify-end gap-6 py-4 px-6 fixed bottom-0 bg-white border-t border-slate-300'>
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
