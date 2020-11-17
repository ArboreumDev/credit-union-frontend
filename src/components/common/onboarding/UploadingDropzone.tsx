import { Box, Spinner, Stack } from "@chakra-ui/core"
import { CheckIcon } from "@chakra-ui/icons"
import { fetchJSON } from "lib/api"
import { UploadRequest } from "pages/api/upload"
import { useState } from "react"
import FileDropzone from "./Dropzone"

interface FileStatus {
  [f: string]: {
    done: boolean
  }
}
interface Props {
  endpoint: string
  s3Key: string
  children: any
}
export function UploadingDropzone({ s3Key, children, endpoint }: Props) {
  const [files, setFiles] = useState<FileStatus>({})

  const onFileDrop = async (data: UploadRequest) => {
    setFiles({ ...files, [data.file_name]: { done: false } })
    try {
      const res = await fetchJSON({
        url: endpoint,
        payload: data,
      })
      console.log(res)
      setFiles({ ...files, [data.file_name]: { done: true } })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box>
      <Box padding={2} borderStyle="dashed" borderWidth={2}>
        <FileDropzone s3Key={s3Key} onDrag={onFileDrop}>
          {children}
        </FileDropzone>
      </Box>
      <Stack>
        {Object.keys(files).map((filename) => (
          <Box key={"id_" + filename}>
            {files[filename].done ? <CheckIcon /> : <Spinner />} {filename}{" "}
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
export default UploadingDropzone
