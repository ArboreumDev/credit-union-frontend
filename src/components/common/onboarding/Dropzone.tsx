import { Spinner } from "@chakra-ui/core"
import Axios from "axios"
import { fetchJSON } from "lib/api"
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
interface Uploaded {
  uploaded: boolean
  kyc_checked: boolean
}
const FileDropzone = (props: { email: string; children: any }) => {
  const [uploadedFiles, setFiles] = useState<{ [filname: string]: Uploaded }>(
    {}
  )

  function setOneFile(filename: string, kyc?: boolean, uploaded?: boolean) {
    const val: Uploaded = uploadedFiles[filename] || {
      kyc_checked: false,
      uploaded: false,
    }
    if (kyc) val.kyc_checked = true
    if (uploaded) val.uploaded = true
    setFiles((files) => ({ ...files, [filename]: val }))
  }
  const onDrop = (acceptedFiles: Array<File>) => {
    if (acceptedFiles) {
      acceptedFiles.forEach(async (file) => {
        setOneFile(file.name, false, false)
        const fdata = (await toBase64(file)) as string
        const ctype = fdata.split(",")[0]
        const b64data = fdata.split(",")[1]
        const data: UploadRequest = {
          email: props.email,
          file_name: file.name,
          ctype: ctype,
          data: b64data,
        }

        try {
          const res = await fetchJSON({
            url: "/api/upload",
            payload: data,
          })
          console.log(res.data)
          setOneFile(file.name, undefined, true)
        } catch (error) {
          console.log(error)
        }
        try {
          const res = await fetchJSON({
            url: "/api/kyc",
            payload: data,
          })
          console.log(res.data)
          setOneFile(file.name, true, false)
        } catch (error) {
          console.log(error)
        }
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
              {!uploadedFiles[file].uploaded && <Spinner />}{" "}
              {!uploadedFiles[file].kyc_checked && <Spinner />} {file}{" "}
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
