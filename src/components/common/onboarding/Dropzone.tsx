import { Spinner } from "@chakra-ui/core"
import Axios from "axios"
import { fetchJSON } from "lib/api"
import { UploadRequest } from "pages/api/upload"
import { useState } from "react"
import Dropzone from "react-dropzone"
import { CheckIcon } from "@chakra-ui/icons"
import { KYCStatus } from "gql/wallet/decentro_kyc_client"

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

class FileState {
  constructor(public uploaded: boolean, public kycChecked: boolean) {}
}

const FileDropzone = (props: { email: string; children: any }) => {
  const [files, setFiles] = useState<string[]>([])
  const [uploads, setUploads] = useState<{ [k: string]: boolean }>({})
  const [kycs, setKYCs] = useState<{ [k: string]: KYCStatus }>({})

  const onDrop = (acceptedFiles: Array<File>) => {
    if (acceptedFiles) {
      acceptedFiles.forEach(async (file) => {
        setFiles([...files, file.name])
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
          console.log(res)
          setUploads({ ...uploads, [file.name]: true })
        } catch (error) {
          console.log(error)
        }
        try {
          const res = await fetchJSON({
            url: "/api/kyc",
            payload: data,
          })
          console.log(res)
          setKYCs({ ...kycs, [file.name]: res.status })
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
          {files.map((file, id) => (
            <li key={"uliload_" + id}>
              {uploads[file] ? <CheckIcon /> : <Spinner />} {kycs[file]}
              {" | "} {file}{" "}
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
