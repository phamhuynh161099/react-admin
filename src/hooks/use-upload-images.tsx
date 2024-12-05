import { useState } from "react"

export interface ImageUploadResult {
    file: File,
    preview: string,
}

const useUploadImage = () => {

    const [images, setImages] = useState<ImageUploadResult[]>([]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        

        if(event.target.files){
            const files = Array.from(event.target.files)

            const imagePreviews = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file)
            }))
            
            setImages([...images, ...imagePreviews]);
        }
    }

    const removeAllImage = () => {
        setImages([]);
    }

    return {
        images,
        setImages,
        handleImageChange,
        removeAllImage,
    }

}

export default useUploadImage