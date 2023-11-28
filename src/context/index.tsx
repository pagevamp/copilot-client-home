'use client'

import { FC, ReactNode, useState, createContext } from 'react'

export interface IAppState {
  bannerImg: string
  showLinkInput: boolean
  readOnly: boolean
}

export interface IAppContext {
  appState: IAppState
  setBannerImg: (image: string) => void
  toggleShowLinkInput: (show: boolean) => void
  toggleReadOnly: (show: boolean) => void
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

  return (
    <AppContext.Provider
      value={{
        appState: state,
        setBannerImg,
        toggleShowLinkInput,
        toggleReadOnly,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
