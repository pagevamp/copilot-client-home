'use client'

import { IClient, ICustomField, ISettings } from '@/types/interfaces'
import { Editor } from '@tiptap/react'
import { FC, ReactNode, useState, createContext } from 'react'

export interface IAppState {
  editor: Editor | null
  bannerImgUrl: string | Blob | null
  bannerImgId: string
  showLinkInput: boolean
  readOnly: boolean
  selectedClient: IClient | null
  selectedClientCompanyName: string
  editorColor: string
  changesCreated: boolean
  settings: ISettings | undefined
  loading: boolean
  //this data should be fetched from API in the future
  clientList: IClient[]
  customFields: ICustomField[]
}

export interface IAppContext {
  appState: IAppState
  toggleShowLinkInput: (v: boolean) => void
  toggleReadOnly: (v: boolean) => void
  setSelectedClient: (client: IClient | null) => void
  setEditorColor: (color: string) => void
  setEditor: (editor: Editor | null) => void
  toggleChangesCreated: (v: boolean) => void
  setSettings: (settings: ISettings) => void
  setLoading: (v: boolean) => void
  setClientList: (clientList: IClient[]) => void
  setCustomFields: (customFields: ICustomField[]) => void
  setClientCompanyName: (companyName: string) => void
  setBannerImgUrl: (imageUrl: string | Blob) => void
  setBannerImgId: (imageId: string) => void
}

interface IAppCoreProvider {
  children: ReactNode
}

export const AppContext = createContext<IAppContext | null>(null)

export const AppContextProvider: FC<IAppCoreProvider> = ({ children }) => {
  const [state, setState] = useState<IAppState>({
    bannerImgUrl: null,
    bannerImgId: '',
    showLinkInput: false,
    readOnly: false,
    selectedClient: null,
    selectedClientCompanyName: '',
    editorColor: '#f8f9fb',
    editor: null,
    changesCreated: false,
    settings: undefined,
    loading: false,
    clientList: [],
    customFields: [],
  })

  const toggleShowLinkInput = (v: boolean) => {
    setState((prev) => ({ ...prev, showLinkInput: v }))
  }

  const toggleReadOnly = (v: boolean) => {
    setState((prev) => ({ ...prev, readOnly: v }))
  }

  const setSelectedClient = (client: IClient | null) => {
    setState((prev) => ({ ...prev, selectedClient: client }))
  }

  const setEditorColor = (color: string) => {
    setState((prev) => ({ ...prev, editorColor: color }))
  }

  const setEditor = (editor: Editor | null) => {
    setState((prev) => ({ ...prev, editor: editor }))
  }

  const toggleChangesCreated = (v: boolean) => {
    setState((prev) => ({ ...prev, changesCreated: v }))
  }

  const setSettings = (settings: ISettings) => {
    setState((prev) => ({ ...prev, settings: settings }))
  }

  const setLoading = (v: boolean) => {
    setState((prev) => ({ ...prev, loading: v }))
  }

  const setClientList = (clientList: IClient[]) => {
    setState((prev) => ({ ...prev, clientList: clientList }))
  }

  const setCustomFields = (customFields: ICustomField[]) => {
    setState((prev) => ({ ...prev, customFields: customFields }))
  }

  const setClientCompanyName = (companyName: string) => {
    setState((prev) => ({ ...prev, selectedClientCompanyName: companyName }))
  }

  const setBannerImgUrl = (imageUrl: string | Blob) => {
    setState((prev) => ({ ...prev, bannerImgUrl: imageUrl }))
  }

  const setBannerImgId = (imageId: string) => {
    setState((prev) => ({ ...prev, bannerImgId: imageId }))
  }

  return (
    <AppContext.Provider
      value={{
        appState: state,
        toggleShowLinkInput,
        toggleReadOnly,
        setSelectedClient,
        setEditorColor,
        setEditor,
        toggleChangesCreated,
        setSettings,
        setLoading,
        setClientList,
        setCustomFields,
        setClientCompanyName,
        setBannerImgUrl,
        setBannerImgId,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
