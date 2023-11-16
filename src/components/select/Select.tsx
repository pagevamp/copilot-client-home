"use client"

import { FC, ReactNode, useState } from "react";
import When from "../hoc/When";


interface IDropDown {
  customOptions: ReactNode;
  name: string;
  selected: string | null;
}

interface ISelectOptions extends Pick<IDropDown, 'customOptions'> {
}

const ArrowIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.99861 10.9643C7.87971 10.9643 7.76079 10.9191 7.67037 10.828L3.33531 6.49249C3.15386 6.31102 3.15386 6.0168 3.33531 5.83532C3.51676 5.65385 3.81095 5.65385 3.9924 5.83532L7.99922 9.84259L12.006 5.83532C12.1875 5.65385 12.4817 5.65385 12.6631 5.83532C12.8446 6.0168 12.8446 6.31102 12.6631 6.49249L8.32807 10.828C8.23641 10.9191 8.11752 10.9643 7.99861 10.9643Z" fill="#212B36" />
    </svg>
  )
}

const SelectOptions: FC<ISelectOptions> = ({ customOptions }) => {

  return (
    <div className="absolute top-12 right-0 w-full py-2 cursor-pointer border border-slate-300 rounded" style={{
      boxShadow: "0px 6px 20px 0px rgba(0, 0, 0, 0.12)",
      zIndex: 1
    }}>
      <div>
        {
          customOptions
        }
      </div>
    </div>
  )
}

const Select: FC<IDropDown> = ({ customOptions, name, selected }) => {

  const [showDropDown, setShowDropDown] = useState(false)

  return (
    <div
      id={name}
      className="w-48 py-2 px-3 
        border border-slate-300 bg-white outline-none rounded relative cursor-pointer"
      onClick={() => setShowDropDown(prev => !prev)}
    >

      <When condition={showDropDown}>
        <SelectOptions
          customOptions={customOptions}
        />
      </When>

      <div className="absolute top-2.5 right-2"><ArrowIcon /></div>

      <div>{selected}</div>

    </div>
  )
}

export default Select 
