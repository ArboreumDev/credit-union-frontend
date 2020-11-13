import { Box, Spinner } from "@chakra-ui/core"
import { CheckIcon } from "@chakra-ui/icons"
import { fetchJSON } from "lib/api"
import { UploadRequest } from "pages/api/upload"
import { useState } from "react"
import FileDropzone from "./Dropzone"

interface FileStatus {
  [f: string]: {
    kyc: boolean
  }
}
interface Props {
  key: string
  children: any
}
export function UploadingDropzone({ key, children }: Props) {
  const [files, setFiles] = useState<FileStatus>({})

  const onFileDrop = async (data: UploadRequest) => {
    setFiles({ ...files, [data.file_name]: { kyc: false } })
    try {
      const res = await fetchJSON({
        url: "/api/kyc",
        payload: data,
      })
      console.log(res)
      setFiles({ ...files, [data.file_name]: { kyc: true } })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box>
      <FileDropzone key={key} onDrag={onFileDrop}>
        {children}
      </FileDropzone>
      <div>
        <ul>
          {Object.keys(files).map((filename) => (
            <li key={"uliload_" + filename}>
              {files[filename].kyc ? <CheckIcon /> : <Spinner />}
              {" | "} {filename}{" "}
            </li>
          ))}
        </ul>
      </div>
    </Box>
  )
}
export default UploadingDropzone
