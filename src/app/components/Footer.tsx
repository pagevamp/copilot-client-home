'use client'

import { When } from '@/components/hoc/When'
import { useAppState } from '@/hooks/useAppState'

export const Footer = () => {
  const appState = useAppState()

  const handleSave = async () => {
    const content = appState?.appState.editor?.getHTML()
    try {
      appState?.setLoading(true)
      await fetch(`/api/settings`, {
        method: 'PUT',
        body: JSON.stringify({
          backgroundColor: appState?.appState.editorColor,
          content: content,
        }),
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
