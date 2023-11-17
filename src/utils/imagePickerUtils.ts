interface IImagePickerUtils {
  selectImageFromLocalDrive(): Promise<File | null>
  imageUrl(file: File): Promise<string | null> | null
  convertBlobToUrlString(image: Blob): Promise<string | null>
}

export class ImagePickerUtils implements IImagePickerUtils {
  image: HTMLInputElement

  constructor() {
    this.image = document.createElement('input')
    this.image.type = 'file'
    this.image.accept = 'image/png, image/jpg'
  }

  selectImageFromLocalDrive(): Promise<File | null> {
    return new Promise((resolve) => {
      this.image.onchange = (event) => {
        const target = event.target as HTMLInputElement
        if (target?.files && target.files.length > 0) {
          const selectedFile = target.files[0]
          resolve(selectedFile)
        } else {
          resolve(null)
        }
      }

      this.image.click()
    })
  }

  imageUrl(file: File): Promise<string | null> | null {
    if (!file.type.startsWith('image/')) {
      console.error('Selected file is not an image.')
      return null
    }

    // Using FileReader to read the file and generate a data URL
    const reader = new FileReader()
    reader.readAsDataURL(file)
    return new Promise((resolve) => {
      reader.onload = () => {
        const dataURL = reader.result as string
        resolve(dataURL)
      }
    })
  }

  convertBlobToUrlString(image: Blob): Promise<string | null> {
    return new Promise<string | null>((resolve) => {
      if (image.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(image);
        resolve(imageUrl);
      } else {
        console.error('Input is not a valid image blob.');
        resolve(null);
      }
    });
  }
}
