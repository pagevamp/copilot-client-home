'use client'

import { FC, ReactNode, useState, createContext } from 'react'

export interface IAppState {
  bannerImg: string;
  showLinkInput: boolean;
}

export interface IAppContext {
  appState: IAppState
  setBannerImg: (image: string) => void
  toggleShowLinkInput: (v: boolean) => void
}

interface IAppCoreProvider {
  children: ReactNode
}

export const AppContext = createContext<IAppContext | null>(null)

export const AppContextProvider: FC<IAppCoreProvider> = ({ children }) => {


  const [state, setState] = useState<IAppState>({
    bannerImg: "",
    showLinkInput: false
  })

  const setBannerImg = (image: string) => {
    setState((prev) => ({ ...prev, bannerImg: image }))
  }

  const toggleShowLinkInput = (v: boolean) => {
    setState((prev) => ({ ...prev, showLinkInput: v }))
  }

  return (
    <AppContext.Provider
      value={{
        appState: state,
        setBannerImg,
        toggleShowLinkInput,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
