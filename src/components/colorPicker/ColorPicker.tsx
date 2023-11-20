import { ChromePicker, SketchPicker } from "react-color"

const ColorPicker = () => {


  return (
    <div className="relative flex">
      <div></div>
      <div></div>

      <div className="absolute">
        <ChromePicker disableAlpha={true}
          styles={
            {
            }
          }
        />
      </div>
    </div>
  )
}

export default ColorPicker
