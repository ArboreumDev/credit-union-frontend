import React, { useState } from "react"
import AppBar from "../../components/AppBar"
import { getSession } from "next-auth/client"
import { Contactus, Mailto } from "../../components/ContactUs"
import Router from "next/router"

interface Session {
  user: {
    name: string
    email: string
    image: string
  }
  accessToken: string
  expires: string
}

interface GuarantorModel {
  name: string
  email: string
  amount: number
}

class BorrowerProfileModel {
  constructor(
    public loan_amount: number,
    public guarantors: Array<GuarantorModel>
  ) {}
}

interface Params {
  session: Session
  model: BorrowerProfileModel
  newBorrower: GuarantorModel
}

const Page = (params: Params) => {
  const session = params.session
  const [state, setState] = useState(params.model)
  const [newBorrower, setNB] = useState(params.newBorrower)

  const onChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    setNB((prevNB) => ({ ...prevNB, [name]: value }))
  }

  // console.log(params.session)
  return (
    <div className="container">
      <AppBar />
    </div>
  )
}

Page.getInitialProps = async (context) => {
  return {
    session: await getSession(context),
    model: new BorrowerProfileModel(100, [
      {
        name: "Amitabh Bachchan",
        email: "bachchan@amitabh.net",
        amount: 10000,
      },
    ]),
    newBorrower: { name: "", email: "", amount: "123" },
  }
}

export default Page
