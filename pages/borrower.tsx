import React, { useState } from 'react'
import { Card, FormGroup, InputGroup, H4, NumericInput, Button, H3, H6 } from '@blueprintjs/core';
import AppBar from '../components/AppBar';
import { getSession } from 'next-auth/client'
import { Contactus, Mailto } from "../components/contact";

interface Session {
    user: {
        name: string;
        email: string;
        image: string;
    };
    accessToken: string;
    expires: string;
}

interface GuarantorModel {
    name: string
    email: string
    amount: number
}

class BorrowerProfileModel {
    constructor(
        public loan_amount: number,
        public guarantors: Array<GuarantorModel>,
    ) { }
}

interface Params {
    session: Session,
    model: BorrowerProfileModel,
    newBorrower: GuarantorModel
}


const Page = (params: Params) => {

    const session = params.session
    const [state, setState] = useState(params.model);
    const [newBorrower, setNB] = useState(params.newBorrower);

    const onChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setNB(prevNB => ({ ...prevNB, [name]: value }))
    }


    // console.log(params.session)
    return (
      <div className="container">
        <AppBar session={session} />
        <div className="grid-container">
          <div>
            <H3>Create a new loan!</H3>
          </div>
          <div>
            <Card className="profile-card">
              <H4>What loan amount do you wish to borrow (INR)?</H4>
              <p></p>
              <p>
                Loan must be paid back fully in 6 monthly instalments. If you do
                not repay an instalment on time, it will be deducted from your
                salary
              </p>

              <NumericInput
                value={state.loan_amount}
                onValueChange={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    max_exposure: value,
                  }))
                }
                stepSize={100}
                majorStepSize={1000}
                minorStepSize={10}
                large
              />
            </Card>
          </div>
          <div>
            <Card className="profile-card">
              <H4>
                What is the reason for the loan? This question is required. *
              </H4>

              <p>
                Please note we may ensure loan is being used for the stated
                purpose
              </p>

              <div>
                <select>
                  <option value="Home">Home repair or renovation</option>
                  <option value="Education">Education expense in family</option>
                  <option value="Medical">Medical expense in family</option>
                  <option value="Business">Business activity related</option>
                  <option value="Wedding">Wedding in family</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </Card>
          </div>
          <div>
            <Card className="profile-card">
              <H4>List the guarantors that support you</H4>

              <p>
                To improve the interest rate, loan size, etc available for you,
                you should bring at least one guarantor from inside the company.{" "}
              </p>

              <p>
                Guarantors will earn interest on whatever amount they contribute
                towards your loan
              </p>

              <p>
                Please enter email addresses of your guarantors and amount they
                will guarantee for your loan. We will cross-check this
                information with themThis question is required. *
              </p>

              <H6>Trusted Guarantors</H6>
              <table className="bp3-html-table">
                <thead>
                  <tr>
                    <td>name</td>
                    <td>email</td>
                    <td>amount</td>
                  </tr>
                </thead>
                <tbody>
                  {state.guarantors.map((guarantor, idx) => (
                    <tr key={"b_td_" + idx}>
                      <td>{guarantor.name}</td>
                      <td>{guarantor.email}</td>
                      <td>{guarantor.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <FormGroup
                helperText=""
                label=""
                labelFor="text-input"
                labelInfo=""
              >
                <InputGroup
                  id="text-input"
                  name="name"
                  width={200}
                  value={newBorrower.name}
                  placeholder={"name"}
                  onChange={onChange}
                />
                <InputGroup
                  id="text-input"
                  name="email"
                  width={200}
                  value={newBorrower.email}
                  placeholder={"email"}
                  onChange={onChange}
                />

                <NumericInput
                  value={newBorrower.amount}
                  onValueChange={(value) =>
                    setNB((prevState) => ({ ...prevState, amount: value }))
                  }
                  stepSize={1}
                  large
                />

                <Button
                  onClick={() =>
                    setState((prevState) => {
                      let b = prevState.guarantors;
                      b.push(newBorrower);
                      setNB({ name: "", email: "", amount: 100 });
                      return { ...prevState, guarantors: b };
                    })
                  }
                >
                  Add
                </Button>
              </FormGroup>
            </Card>
          </div>
          <div>
            <Card className="">
              <H4>KYC</H4>

              <p>
                Please{" "}
                <Mailto
                  email="contact@arboreum.dev"
                  subject="New Loan KYC "
                  body="Docements are attached!"
                >
                  email
                </Mailto>{" "}
                us the copies of the following documents for KYC as soon as possible after you submit this form.
              </p>

              <div>
                <ul>
                  <li>Passport</li>
                  <li>Aadhar</li>
                  <li>etc</li>
                </ul>
              </div>
            </Card>
          </div>
          <div>
            <Card>
              <p>
                I understand that I am expected to return the loan in 6 monthly
                installments. I understand that if I am unable to repay for
                reasons beyond my control, I need to inform HR, failing which
                the installment will be automatically deducted from my salary.
              </p>
              <Button intent="primary">Save</Button>
            </Card>
          </div>
          <style jsx>
            {`
              .grid-container {
                display: grid;
                grid-template-columns: auto;
                grid-gap: 0px;
                padding: 20px 100px 0px 100px;
              }
              .item3 {
                grid-column-start: 1;
                grid-column-end: 3;
              }
              .grid-container > div {
              }
            `}
          </style>
        </div>
      </div>
    );
}

Page.getInitialProps = async (context) => {
    return {
        session: await getSession(context),
        model: new BorrowerProfileModel(100, [{ name: "amitabh", email: "bachan", amount: 100 }]),
        newBorrower: { name: "", email: "", amount: "123" }
    }
}

export default Page
