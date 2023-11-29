'use client'

import { Editor } from '@tiptap/react';
import { FC, ReactNode, useState, createContext } from 'react'

export interface IAppState {
  bannerImg: string;
  showLinkInput: boolean;
  readOnly: boolean;
  selectedClient: string;
  editorColor: string;
  editor: Editor | null
  //this data should be fetched from API in the future
  mockData: {
    clientId: number; givenName: string; familyName: string;
    email: string; company: string; address: string;
  }[]
}

export interface IAppContext {
  appState: IAppState
  setBannerImg: (image: string) => void
  toggleShowLinkInput: (v: boolean) => void
  toggleReadOnly: (v: boolean) => void
  setSelectedClient: (client: string) => void
  setEditorColor: (color: string) => void
  setEditor: (editor: Editor | null) => void
}

interface IAppCoreProvider {
  children: ReactNode
}

const mockData = [
  {
    clientId: 1,
    givenName: "John",
    familyName: "Doe",
    email: "john@gmail.com",
    company: "The Fossils",
    address: "New Town"
  },
  {
    clientId: 2,
    givenName: "Krish",
    familyName: "Jane",
    email: "krish@gmail.com",
    company: "Yangtaru",
    address: "Brooklyn"
  }
]

export const AppContext = createContext<IAppContext | null>(null)

export const AppContextProvider: FC<IAppCoreProvider> = ({ children }) => {

  const [state, setState] = useState<IAppState>({
    bannerImg: "",
    showLinkInput: false,
    readOnly: false,
    selectedClient: "",
    editorColor: "#f8f9fb",
    editor: null,
    mockData
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

  const setEditorColor = (color: string) => {
    setState((prev) => ({ ...prev, editorColor: color }))
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
        setSelectedClient,
        setEditorColor,
        setEditor
      }}
    >
      {children}
    </AppContext.Provider>
  )
}