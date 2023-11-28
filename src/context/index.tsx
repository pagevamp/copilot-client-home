'use client'

import { Editor } from '@tiptap/react'
import { FC, ReactNode, useState, createContext } from 'react'

export interface IAppState {
  bannerImg: string
  showLinkInput: boolean
  readOnly: boolean
  editor: Editor | null
}

export interface IAppContext {
  appState: IAppState
  setBannerImg: (image: string) => void
  toggleShowLinkInput: (show: boolean) => void
  toggleReadOnly: (show: boolean) => void
  setEditor: (editor: Editor | null) => void
}

interface IAppCoreProvider {
  children: ReactNode
}

export const AppContext = createContext<IAppContext | null>(null)

export const AppContextProvider: FC<IAppCoreProvider> = ({ children }) => {
  const [state, setState] = useState<IAppState>({
    bannerImg: '',
    showLinkInput: false,
    readOnly: false,
    editor: null
  })

  const setBannerImg = (image: string) => {
    setState((prev) => ({ ...prev, bannerImg: image }))
  }

  const toggleShowLinkInput = (show: boolean) => {
    setState((prev) => ({ ...prev, showLinkInput: show }))
  }

  const toggleReadOnly = (show: boolean) => {
    setState((prev) => ({ ...prev, readOnly: show }))
  }

  const setEditor = (editor: Editor | null) => {
    setState((prev) => ({ ...prev, editor: editor }))
  }

  return (
    <AppContext.Provider
      value={{
        appState: state,
        setBannerImg,
        toggleShowLinkInput,
        toggleReadOnly,
        setEditor
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
