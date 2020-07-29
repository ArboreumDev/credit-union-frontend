import React, { useState } from "react";
import {
  Card,
  FormGroup,
  InputGroup,
  H5,
  NumericInput,
  Button,
} from "@blueprintjs/core";
import AppBar from "../components/AppBar";
import { getSession } from "next-auth/client";
import { Contactus } from "../components/contact";

interface Session {
  user: {
    name: string;
    email: string;
    image: string;
  };
  accessToken: string;
  expires: string;
}

interface BorrowerModel {
  name: string;
  email: string;
  amount: number;
}

class ProfileModel {
  constructor(
    public max_exposure: number,
    public min_interest_rate: number,
    public borrowers: Array<BorrowerModel>
  ) {}
}

interface Params {
  session: Session;
  model: ProfileModel;
  newBorrower: BorrowerModel;
}

const Page = (params: Params) => {
  const session = params.session;
  const [state, setState] = useState(params.model);
  const [newBorrower, setNB] = useState(params.newBorrower);

  const onChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setNB((prevNB) => ({ ...prevNB, [name]: value }));
  };

  // console.log(params.session)
  return (
    <div className="container">
      <AppBar session={session} />
      <div className="center">
        <Card className="profile-card">
          <H5>Profile</H5>
          <p>{session.user.name}</p>
          <p> {session.user.email}</p>
        </Card>
        <Card className="profile-card">
          <H5>Total Exposure</H5>
          <p>
            Maximum amount you wish to loan out, in INR? This will be your total
            exposure across corpus and guarantee investments.
          </p>
          <p>
            (For the trial period of this program, this is a minimum 2-month
            commitment)
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
                <td>name</td>
                <td>email</td>
                <td>amount</td>
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
        <Card>
          <Contactus /> to make any changes.
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
  );
};

Page.getInitialProps = async (context) => {
  return {
    session: await getSession(context),
    model: new ProfileModel(100, 200, [
      { name: "g", email: "gp@arboreum.dev", amount: 10 },
    ]),
    newBorrower: { name: "", email: "", amount: "100" },
  };
};

export default Page;
