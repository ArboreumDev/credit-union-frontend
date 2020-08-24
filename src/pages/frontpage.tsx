import axios from "axios"
import { Fragment } from "react"

const FrontPage = (props: { html: string }) => {
  console.log(props)
  return (
    <div className="Container">
      <div>
        <div>
          <img width="150px" src="/images/logo.svg" alt="logo" />
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.html }} />
      </div>

      <style jsx>
        {`
          .Container {
            // position: relative;
            // min-height: 300px;
            // max-height: 100%;
            // overflow: hidden;
            text-align: center;
            margin: 5em auto;
            padding: 10px;
          }
        `}
      </style>
    </div>
  )
}

FrontPage.getInitialProps = async (context) => {
  const base_url = process.env.SITE || ""
  const url = base_url + "/api/auth/signin"
  console.log(url)

  const data = await axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => console.log(error))
  console.log("here", data)
  return { html: data }
}

export default FrontPage
