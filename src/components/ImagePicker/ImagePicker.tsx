import { ImagePickerUtils } from "@/utils/imagePickerUtils";
import { useState } from "react";


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
    <div className="" onClick={pickImage}>
      {
        imgUrl ?
          <img src={imgUrl} alt={"banner img picker"}
            className="object-cover w-8 h-8 rounded-sm"
          /> : null
      }
    </div>
  )
}

export default ImagePicker
