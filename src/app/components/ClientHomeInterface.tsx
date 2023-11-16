"use client"

import ImagePicker from "@/components/ImagePicker/ImagePicker"
import Select from "@/components/select/Select"
import { useState } from "react"

const ClientHomeInterface = () => {

  const clients = ["Jimbo", "Beanie dude", "Beach guy"]
  const defaultValue = "Preview mode off"

  const [selected, setSelected] = useState(defaultValue)


  return (
    <div>
      <div className="p-4 flex items-center justify-between">
        <p>Preview mode</p>
        <Select
          name="Preview mode"
          customOptions={
            <>
              <div
                className={`hover:bg-slate-50 py-2 px-3 ${selected === defaultValue ? "bg-slate-50" : ""}`}
                onClick={() => setSelected(defaultValue)}
              >{defaultValue}</div>
              {
                clients.map((val, key) => {
                  return (
                    <div key={key}
                      className={`hover:bg-slate-50 py-2 px-3 ${selected === val ? "bg-slate-50" : ""}`}
                      onClick={() => setSelected(val)}
                    >{val}</div>
                  )
                })
              }
            </>
          }
          selected={selected}
        />
      </div>

      <hr />

      <ImagePicker getImage={(file) => {
        console.log(file)
      }} />
    </div>
  )
}

export default ClientHomeInterface
