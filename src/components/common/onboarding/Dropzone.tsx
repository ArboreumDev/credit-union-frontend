import { UploadRequest } from "pages/api/upload"
import { useState } from "react"
import Dropzone from "react-dropzone"

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const FileDropzone = (props: {
  s3Key: string
  onDrag: (data: UploadRequest) => void
  children: any
}) => {
  const [files, setFiles] = useState<string[]>([])

  const onDrop = (acceptedFiles: Array<File>) => {
    if (acceptedFiles) {
      acceptedFiles.forEach(async (file) => {
        setFiles([...files, file.name])
        const fdata = (await toBase64(file)) as string
        const ctype = fdata.split(",")[0]
        const b64data = fdata.split(",")[1]
        const data: UploadRequest = {
          s3Key: props.s3Key,
          file_name: file.name,
          ctype: ctype,
          data: b64data,
        }
        props.onDrag(data)
      })
    }
  }
  return (
    <div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            {props.children}
          </div>
        )}
      </Dropzone>
    </div>
  )
}
export default FileDropzone
