"use client"

import { FC, ReactNode, useState, createContext } from "react";

export interface IAppState {
  bannerImg: string;
}

export interface IAppContext {
  appState: IAppState;
  setBannerImg: (imgUrl: string) => void;
}

interface IAppCoreProvider {
  children: ReactNode;
}


export const AppContext = createContext<IAppContext | null>(null)

export const AppContextProvider: FC<IAppCoreProvider> = ({ children }) => {

  const [state, setState] = useState<IAppState>({
    bannerImg: "",
  })

  const setBannerImg = (imgUrl: string) => {
    setState(prev => ({ ...prev, bannerImg: imgUrl }))
  }


  return <AppContext.Provider value={{
    appState: state,
    setBannerImg
  }}>
    {children}
  </AppContext.Provider>

}

