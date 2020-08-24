import Dropzone from "react-dropzone"
import Axios from "axios"
import { useState } from "react"
import { UploadRequest } from "../pages/api/upload"

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export default (props: { email: string }) => {
  const [uploadedFiles, setFiles] = useState<{ [filname: string]: boolean }>({})
  console.log(uploadedFiles)
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
            <p>Drop ID card here. </p>
          </div>
        )}
      </Dropzone>
      <div>
        <ul>
          {Object.keys(uploadedFiles).map((file, id) => (
            <li key={"uliload_" + id}>
              {!uploadedFiles[file] && "[Uploading]"} {file}{" "}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>
        {`
          .dropzone {
            width: 100%;
            height: 100px;
            border-style: dashed;
            /* margin-bottom: 100px; */
          }
        `}
      </style>
    </div>
  )
}
