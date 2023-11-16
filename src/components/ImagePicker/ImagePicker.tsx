import { ImagePickerUtils } from "@/utils/imagePickerUtils";
import { useState } from "react";

const PlusIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M14.2007 8.00075C14.2007 8.33195 13.9319 8.60075 13.6007 8.60075H8.60075V13.6007C8.60075 13.9319 8.33195 14.2007 8.00075 14.2007C7.66956 14.2007 7.40076 13.9319 7.40076 13.6007V8.60075H2.40078C2.06958 8.60075 1.80078 8.33195 1.80078 8.00075C1.80078 7.66956 2.06958 7.40076 2.40078 7.40076H7.40076V2.40078C7.40076 2.06958 7.66956 1.80078 8.00075 1.80078C8.33195 1.80078 8.60075 2.06958 8.60075 2.40078V7.40076H13.6007C13.9319 7.40076 14.2007 7.66956 14.2007 8.00075Z" fill="#0E0E10" />
    </svg>
  )
}


const ImagePicker = () => {

  const [imgUrl, setImgUrl] = useState("")

  const pickImage = async () => {
    const imagePickerUtils = new ImagePickerUtils();

    const file = await imagePickerUtils.selectImageFromLocalDrive()

    if (file) {
      const imgUrl = await imagePickerUtils.imageUrl(file)
      setImgUrl(imgUrl as string)
    }

  }


  return (
    <div className="flex justify-center border border-slate-200 w-8 h-8" onClick={pickImage}>
      {
        imgUrl ?
          <img src={imgUrl} alt={"banner img picker"}
            className="object-cover w-8 h-8 rounded-sm"
          /> : <div className="self-center"><PlusIcon /></div>
      }
    </div>
  )
}

export default ImagePicker
