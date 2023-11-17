'use client'

import { FC, ReactNode, useState, createContext } from 'react'

export interface IAppState {
  bannerImg: string
}

export interface IAppContext {
  appState: IAppState
  setBannerImg: (image: string) => void
}

interface IAppCoreProvider {
  children: ReactNode
}

export const AppContext = createContext<IAppContext | null>(null)

export const AppContextProvider: FC<IAppCoreProvider> = ({ children }) => {
  const [state, setState] = useState<IAppState>({
    bannerImg: "",
  })

  const setBannerImg = (image: string) => {
    setState((prev) => ({ ...prev, bannerImg: image }))
  }

  return (
    <AppContext.Provider
      value={{
        appState: state,
        setBannerImg,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
