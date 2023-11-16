"use client"

import Select from "@/components/Select"

const ClientHomeInterface = () => {
  return (
    <Select values={["Off", "On"]} name="Preview Mode" getOnChange={(val) => {
      console.log(val)
    }} />
  )
}

export default ClientHomeInterface
