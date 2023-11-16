"use client"

import { FC, useState } from "react";
import When from "./hoc/When";

interface IDropDown {
  values: string[];
  name: string;
  getOnChange: (val: string) => void;
}

interface ISelectOptions extends Pick<IDropDown, 'values' | 'getOnChange'> {
}

const ArrowIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.99861 10.9643C7.87971 10.9643 7.76079 10.9191 7.67037 10.828L3.33531 6.49249C3.15386 6.31102 3.15386 6.0168 3.33531 5.83532C3.51676 5.65385 3.81095 5.65385 3.9924 5.83532L7.99922 9.84259L12.006 5.83532C12.1875 5.65385 12.4817 5.65385 12.6631 5.83532C12.8446 6.0168 12.8446 6.31102 12.6631 6.49249L8.32807 10.828C8.23641 10.9191 8.11752 10.9643 7.99861 10.9643Z" fill="#212B36" />
    </svg>
  )
}

const SelectOptions: FC<ISelectOptions> = ({ values, getOnChange }) => {

  return (
    <div className="absolute top-10 right-0 w-full py-2 cursor-pointer">
      {
        values.map((val, key) => {
          return (
            <div key={key} onClick={() => getOnChange(val)}
              className="hover:bg-slate-50 py-2 px-3"
            >{val}</div>
          )
        })
      }
    </div>
  )
}

const Select: FC<IDropDown> = ({ values, name, getOnChange }) => {

  const [showDropDown, setShowDropDown] = useState(false)

  const [selected, setSelected] = useState("")

  const defaultValue = values[0]

  return (
    <form>
      <div
        id={name}
        className="w-48 py-2 px-3 
        border border-slate-300 bg-white outline-none rounded relative cursor-pointer"
        onClick={() => setShowDropDown(prev => !prev)}
      >

        <When condition={showDropDown}>
          <SelectOptions values={values} getOnChange={(val) => {
            getOnChange(val)
            setSelected(val)
          }}
          />
        </When>

        <div className="absolute top-2.5 right-2"><ArrowIcon /></div>

        <div>{selected ? selected : defaultValue}</div>

      </div>
    </form>
  )
}

export default Select 
