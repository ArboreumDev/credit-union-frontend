import { Box, Spinner } from "@chakra-ui/core"
import { CheckIcon } from "@chakra-ui/icons"
import { fetchJSON } from "lib/api"
import { UploadRequest } from "pages/api/upload"
import { useState } from "react"
import FileDropzone from "./Dropzone"

interface FileStatus {
  [f: string]: {
    uploaded: boolean
  }
}
interface Props {
  key: string
  children: any
}
export function UploadingDropzone({ key, children }: Props) {
  const [files, setFiles] = useState<FileStatus>({})

  const onFileDrop = async (data: UploadRequest) => {
    setFiles({ ...files, [data.file_name]: { uploaded: false } })
    try {
      const res = await fetchJSON({
        url: "/api/upload",
        payload: data,
      })
      console.log(res)
      setFiles({ ...files, [data.file_name]: { uploaded: true } })
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
              {files[filename].uploaded ? <CheckIcon /> : <Spinner />}
              {" | "} {filename}{" "}
            </li>
          ))}
        </ul>
      </div>
    </Box>
  )
}
export default UploadingDropzone
