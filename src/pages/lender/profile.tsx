import React, { useState } from "react"
import {
  Card,
  FormGroup,
  InputGroup,
  H5,
  NumericInput,
  Button,
} from "@blueprintjs/core"

import { getSession } from "next-auth/client"
import { Contactus } from "../../components/ContactUs"
import { User, UserType, Session } from "../../utils/types"
import AppBar from "../../components/AppBar"

interface BorrowerModel {
  name: string
  email: string
  amount: number
}

class ProfileModel {
  constructor(
    public max_exposure: number,
    public min_interest_rate: number,
    public borrowers: Array<BorrowerModel>
  ) {}
}

interface Params {
  session: Session
  model: ProfileModel
  newBorrower: BorrowerModel
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
      <div className="center">
        <Card className="profile-card">
          <H5>Profile</H5>
          <p>{session.user.name}</p>
          <p> {session.user.email}</p>
        </Card>
        <Card className="profile-card">
          <H5>Total Exposure</H5>
          <p>What is the maximum amount you wish to lend (in INR)?</p>
          <p>
            This will be your total exposure across corpus and guarantee
            investments.
          </p>
          <p>
            <i>
              For this program trial, these funds will be unavailable for
              withdrawal for a minimum of 2 months.
            </i>
          </p>

          <NumericInput
            value={state.max_exposure}
            onValueChange={(value) =>
              setState((prevState) => ({ ...prevState, max_exposure: value }))
            }
            stepSize={100}
            majorStepSize={1000}
            minorStepSize={10}
            large
          />
        </Card>
        <Card className="profile-card">
          <H5>Trusted Borrowers</H5>
          <table className="bp3-html-table">
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Amount</td>
              </tr>
            </thead>
            <tbody>
              {state.borrowers.map((borrower, idx) => (
                <tr key={"b_td_" + idx}>
                  <td>{borrower.name}</td>
                  <td>{borrower.email}</td>
                  <td>{borrower.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="profile-card">
          <Button intent="primary">Save</Button>
        </Card>
        <style jsx>
          {`
            .center {
              margin: auto;
              width: 50%;
              padding: 10px;
            }
            .profile_card {
              margin: "10px";
            }
          `}
        </style>
      </div>
    </div>
  )
}

Page.getInitialProps = async (context) => {
  return {
    session: await getSession(context),
    model: new ProfileModel(100, 200, [
      { name: "Laurence Day", email: "laurence@arboreum.dev", amount: 50 },
      { name: "Gaurav Paruthi", email: "gp@arboreum.dev", amount: 10 },
      { name: "Deepika Padukone", email: "deepika@gmail.com", amount: 35 },
    ]),
    newBorrower: { name: "", email: "", amount: "100" },
  }
}

export default Page
