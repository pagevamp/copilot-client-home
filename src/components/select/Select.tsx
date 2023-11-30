'use client'

import { FC, ReactNode, useState } from 'react'
import { When } from '../hoc/When'
import { SelectArrowIcon } from '@/icons'

interface IDropDown {
  customOptions: ReactNode
  name: string
  selected: string | null
  className?: string
}

interface ISelectOptions extends Pick<IDropDown, 'customOptions'> {}

const SelectOptions: FC<ISelectOptions> = ({ customOptions }) => {
  return (
    <div
      className='bg-white absolute top-12 right-0 w-full py-2 cursor-pointer border border-slate-300 rounded z-50'
      style={{
        boxShadow: '0px 6px 20px 0px rgba(0, 0, 0, 0.12)',
      }}
    >
      {customOptions}
    </div>
  )
}

const Select: FC<IDropDown> = ({
  customOptions,
  name,
  selected,
  className,
}) => {
  const [showDropDown, setShowDropDown] = useState(false)

  return (
    <div
      id={name}
      className={`w-48 py-2 px-3 border border-slate-300 bg-white outline-none rounded relative cursor-pointer ${className}`}
      onClick={() => setShowDropDown((prev) => !prev)}
    >
      <When condition={showDropDown}>
        <SelectOptions customOptions={customOptions} />
      </When>

      <div className='absolute top-2.5 right-2'>
        <SelectArrowIcon />
      </div>

      <div>{selected}</div>
    </div>
  )
}

export default Select
