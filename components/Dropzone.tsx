import Dropzone from "react-dropzone"
import Axios from "axios"

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export default () => {
  const onDrop = (acceptedFiles: Array<File>) => {
    if (acceptedFiles) {
      acceptedFiles.forEach(async (file) => {
        console.log(file)
        const fdata = await toBase64(file) as string
        const ctype = fdata.split(',')[0]
        const b64data = fdata.split(",")[1]
        const data = {
            file_name: file.name,
            ctype: ctype,
            data: b64data
        }

        await Axios.post("/api/upload", data, {
          method: "POST",
        })
          .then((res) => console.log(res.data))
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
            <p>Drop images to be annotated here</p>
          </div>
        )}
      </Dropzone>
      <style jsx>
        {`
          .dropzone {
            width: 100%;
            height: 200px;
            border-style: dashed;
            /* margin-bottom: 100px; */
          }
        `}
      </style>
    </div>
  )
}
