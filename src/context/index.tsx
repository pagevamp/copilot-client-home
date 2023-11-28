'use client'

import { FC, ReactNode, useState, createContext } from 'react'

export interface IAppState {
  bannerImg: string
  showLinkInput: boolean
  readOnly: boolean
  selectedClient: string
  //this data should be fetched from API in the future
  mockData: {
    clientId: number
    givenName: string
    familyName: string
    email: string
    company: string
    address: string
  }[]
}

export interface IAppContext {
  appState: IAppState
  setBannerImg: (image: string) => void
  toggleShowLinkInput: (v: boolean) => void
  toggleReadOnly: (v: boolean) => void
  setSelectedClient: (client: string) => void
}

interface IAppCoreProvider {
  children: ReactNode
}

const mockData = [
  {
    clientId: 1,
    givenName: 'John',
    familyName: 'Doe',
    email: 'john@gmail.com',
    company: 'The Fossils',
    address: 'New Town',
  },
  {
    clientId: 2,
    givenName: 'Krish',
    familyName: 'Jane',
    email: 'krish@gmail.com',
    company: 'Yangtaru',
    address: 'Brooklyn',
  },
]

export const AppContext = createContext<IAppContext | null>(null)

export const AppContextProvider: FC<IAppCoreProvider> = ({ children }) => {
  const [state, setState] = useState<IAppState>({
    bannerImg: '',
    showLinkInput: false,
    readOnly: false,
    selectedClient: '',
    mockData,
  })

  const setBannerImg = (image: string) => {
    setState((prev) => ({ ...prev, bannerImg: image }))
  }

  const toggleShowLinkInput = (v: boolean) => {
    setState((prev) => ({ ...prev, showLinkInput: v }))
  }

  const toggleReadOnly = (v: boolean) => {
    setState((prev) => ({ ...prev, readOnly: v }))
  }

  const setSelectedClient = (client: string) => {
    setState((prev) => ({ ...prev, selectedClient: client }))
  }

  return (
    <AppContext.Provider
      value={{
        appState: state,
        setBannerImg,
        toggleShowLinkInput,
        toggleReadOnly,
        setSelectedClient,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
