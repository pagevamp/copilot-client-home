import { PlusIcon, UploadIcon } from "@/icons";
import { ImagePickerUtils } from "@/utils/imagePickerUtils";
import { FC, useCallback, useState } from "react";
import { When } from "@/components/hoc/When";
import ImageCropper from "@/components/imageCropper/ImageCropper";
import { useDropzone } from "react-dropzone";


interface IImagePicker {
  getImage: (file: Blob | null) => void
}

const ImagePicker: FC<IImagePicker> = ({ getImage }) => {
  const [imgUrl, setImgUrl] = useState('')
  const [showCropper, setShowCropper] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: Array<File>) => {
      const imagePickerUtils = new ImagePickerUtils()
      const file = acceptedFiles[0]
      if (file) {
        const imgUrl = await imagePickerUtils.imageUrl(file)
        setImgUrl(imgUrl as string)
        setShowCropper(true)
      }
    },
    [getImage],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  return (
    <>
      <div
        className='p-4 flex items-center justify-between cursor-pointer'
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>Banner image</p>
        <div
          className={`flex justify-center w-8 h-8 ${
            isDragActive
              ? 'outline-dashed outline-2 outline-slate-200'
              : ' border border-slate-200'
          }`}
        >
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={'banner img picker'}
              className='object-cover w-8 h-8 rounded-sm'
            />
          ) : !imgUrl && !isDragActive ? (
            <div className='self-center'>
              <PlusIcon />
            </div>
          ) : (
            <div className='self-center'>
              <UploadIcon />
            </div>
          )}
        </div>
      </div>
      <When condition={showCropper}>
        <ImageCropper
          open={showCropper}
          image={imgUrl}
          getImage={(image) => {
            getImage(image)
            setShowCropper(false)
          }}
          onCancel={() => setShowCropper(false)}
        />
      </When>
    </>
  )
}

export default ImagePicker
