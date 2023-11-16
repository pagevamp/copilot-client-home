"use client"

import { ImagePickerUtils } from "@/utils/imagePickerUtils";
import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const PlusIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M14.2007 8.00075C14.2007 8.33195 13.9319 8.60075 13.6007 8.60075H8.60075V13.6007C8.60075 13.9319 8.33195 14.2007 8.00075 14.2007C7.66956 14.2007 7.40076 13.9319 7.40076 13.6007V8.60075H2.40078C2.06958 8.60075 1.80078 8.33195 1.80078 8.00075C1.80078 7.66956 2.06958 7.40076 2.40078 7.40076H7.40076V2.40078C7.40076 2.06958 7.66956 1.80078 8.00075 1.80078C8.33195 1.80078 8.60075 2.06958 8.60075 2.40078V7.40076H13.6007C13.9319 7.40076 14.2007 7.66956 14.2007 8.00075Z" fill="#0E0E10" />
    </svg>
  )
}

const UploadIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M5.64661 4.35333C5.45128 4.15799 5.45128 3.84131 5.64661 3.64597L7.6466 1.64599C7.6926 1.59999 7.74803 1.56333 7.80936 1.538C7.93136 1.48733 8.06935 1.48733 8.19135 1.538C8.25269 1.56333 8.30795 1.59999 8.35395 1.64599L10.3539 3.64597C10.5493 3.84131 10.5493 4.15799 10.3539 4.35333C10.2566 4.45066 10.1286 4.49997 10.0006 4.49997C9.87259 4.49997 9.74457 4.45133 9.64723 4.35333L8.5006 3.20665V10.6666C8.5006 10.9426 8.2766 11.1666 8.0006 11.1666C7.7246 11.1666 7.5006 10.9426 7.5006 10.6666V3.2073L6.35397 4.35398C6.15797 4.54864 5.84195 4.54866 5.64661 4.35333ZM11.9999 6.16663C11.7239 6.16663 11.4999 6.39062 11.4999 6.66662C11.4999 6.94262 11.7239 7.16662 11.9999 7.16662C13.0512 7.16662 13.4999 7.61528 13.4999 8.66661V11.9999C13.4999 13.0512 13.0512 13.4999 11.9999 13.4999H3.99998C2.94866 13.4999 2.49999 13.0512 2.49999 11.9999V8.66661C2.49999 7.61528 2.94866 7.16662 3.99998 7.16662C4.27598 7.16662 4.49998 6.94262 4.49998 6.66662C4.49998 6.39062 4.27598 6.16663 3.99998 6.16663C2.38799 6.16663 1.5 7.05462 1.5 8.66661V11.9999C1.5 13.6119 2.38799 14.4999 3.99998 14.4999H11.9999C13.6119 14.4999 14.4999 13.6119 14.4999 11.9999V8.66661C14.4999 7.05462 13.6119 6.16663 11.9999 6.16663Z" fill="#0E0E10" />
    </svg>
  )
}

interface IImagePicker {
  getImage: (file: File | null) => void;
}

const ImagePicker: FC<IImagePicker> = ({ getImage }) => {

  const [imgUrl, setImgUrl] = useState("")

  const imagePickerUtils = new ImagePickerUtils();

  const pickImage = async () => {

    const file = await imagePickerUtils.selectImageFromLocalDrive()

    if (file) {
      const imgUrl = await imagePickerUtils.imageUrl(file)
      setImgUrl(imgUrl as string)
      getImage(file)
    }
  }

  const onDrop = useCallback(async (acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0]
    if (!!file) {
      const imgUrl = await imagePickerUtils.imageUrl(file)
      setImgUrl(imgUrl as string)
    }
    getImage(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  })

  return (
    <div className="p-4 flex items-center justify-between cursor-pointer"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p>Banner image</p>
      <div className={`flex justify-center w-8 h-8 ${isDragActive ? "outline-dashed outline-2 outline-slate-200" : " border border-slate-200"}`}
        onClick={pickImage}
      >
        {
          imgUrl ?
            <img src={imgUrl} alt={"banner img picker"}
              className="object-cover w-8 h-8 rounded-sm"
            />
            : (!imgUrl && !isDragActive) ?
              <div className="self-center"><PlusIcon /></div>
              :
              <div className="self-center"><UploadIcon /></div>
        }
      </div>
    </div>
  )
}

export default ImagePicker
