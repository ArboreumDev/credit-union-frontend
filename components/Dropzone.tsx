import Dropzone from "react-dropzone"
import Axios from "axios"
import { useState } from "react"

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export default (props: {email: string}) => {
  const [uploadedFiles, setFiles] = useState([])
  console.log(uploadedFiles)
  const onDrop = (acceptedFiles: Array<File>) => {
    if (acceptedFiles) {
      acceptedFiles.forEach(async (file) => {
        console.log(file)
        const fdata = await toBase64(file) as string
        const ctype = fdata.split(',')[0]
        const b64data = fdata.split(",")[1]
        const data = {
            email: props.email,
            file_name: file.name,
            ctype: ctype,
            data: b64data
        }

        await Axios.post("/api/upload", data, {
          method: "POST",
        })
          .then((res) => {
            console.log(res.data)
            setFiles(files => [...files, file.name])
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
        Uploaded: 
        {uploadedFiles.map(file => <p>{file}</p>)}
      </div>

      <style jsx>
        {`
          .dropzone {
            width: 50%;
            height: 100px;
            border-style: dashed;
            /* margin-bottom: 100px; */
          }
        `}
      </style>
    </div>
  )
}
