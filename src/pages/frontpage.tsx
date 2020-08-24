import axios from "axios"
import { Fragment } from "react"

const FrontPage = () => {
  return (
    <div className="Container">
      <div>
        <div>
          <img width="150px" src="/images/logo.svg" alt="logo" />
        </div>
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

export default FrontPage
