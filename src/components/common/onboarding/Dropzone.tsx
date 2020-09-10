import { Spinner } from "@chakra-ui/core"
import Axios from "axios"
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

const FileDropzone = (props: { email: string; children: any }) => {
  const [uploadedFiles, setFiles] = useState<{ [filname: string]: boolean }>({})
  const onDrop = (acceptedFiles: Array<File>) => {
    if (acceptedFiles) {
      acceptedFiles.forEach(async (file) => {
        setFiles((files) => ({ ...files, [file.name]: false }))
        const fdata = (await toBase64(file)) as string
        const ctype = fdata.split(",")[0]
        const b64data = fdata.split(",")[1]
        const data: UploadRequest = {
          email: props.email,
          file_name: file.name,
          ctype: ctype,
          data: b64data,
        }

        await Axios.post("/api/upload", data, {
          method: "POST",
        })
          .then((res) => {
            console.log(res.data)
            setFiles((files) => ({ ...files, [file.name]: true }))
          })
          .catch((error) => console.log(error))
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
      <div>
        <ul>
          {Object.keys(uploadedFiles).map((file, id) => (
            <li key={"uliload_" + id}>
              {!uploadedFiles[file] && <Spinner />} {file}{" "}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>
        {`
          .dropzone {
            padding: 20px;
            height: 150px;
            border-style: dashed;
            border-width: 2px;
          }
        `}
      </style>
    </div>
  )
}
export default FileDropzone
