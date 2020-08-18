import React, { useState } from 'react'
import { Card, FormGroup, InputGroup, H4, NumericInput, Button, H3, H6, TextArea } from '@blueprintjs/core';
import AppBar from '../../components/AppBar';
import { getSession } from 'next-auth/client'
import { Contactus, Mailto } from "../../components/ContactUs";
import Router from "next/router";

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
            <H3>Request A New Loan</H3>
          </div>
          <div>
            <Card className="profile-card">
              <H4>Amount You Wish To Borrow (In INR)?</H4>
              <p></p>
              <p>
                Loan must be paid back fully (with interest) in 6 monthly instalments. If you miss a repayment, it will be deducted from your salary.
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
                Reason For Loan
              </H4>
              <p>
                Please note we may run checks to ensure that the loan is being used for the stated purpose.
              </p>
			  <p>
			  * This question is required.
			  </p>
              <div>
                <select>
                  <option value="Home">Home Repair/Renovation</option>
                  <option value="Education">Education Expense</option>
                  <option value="Medical">Medical Expense</option>
                  <option value="Business">Business Activity</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </Card>
          </div>
          <div>
            <Card className="profile-card">
              <H4>List Of Guarantors Supporting Your Loan</H4>

              <p>
                To improve the interest rate, loan size, etc. that is available to you,
                you should bring <b>at least</b> one guarantor from inside the company.{" "}
              </p>

              <p>
                Guarantors will earn interest on whatever amount they contribute
                towards your loan
              </p>

              <p>
                Please enter email addresses of your guarantors and amount they
                will guarantee for your loan. We will cross-check this
                information with them.
              </p>
			  <p>
			  This question is required.*
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
              <p>
                
                <Mailto
                  email="contact@arboreum.dev"
                  subject="Please add these guarantors to my profile"
                  body="name, email, amount"
                >
                  Email
                </Mailto>{" "}
                us the name, email and amounts of your guarantors.
              </p>
            </Card>
          </div>
          <div>
            <Card className="">
              <H4>KYC (Know Your Customer)</H4>

              <p>
                Please{" "}
                <Mailto
                  email="contact@arboreum.dev"
                  subject="New Loan | KYC "
                  body="Documents are attached."
                >
                  email
                </Mailto>{" "}
                us the copies of the following documents for KYC as soon as
                possible after you submit this form.
              </p>
			  <p>
			  The sooner you do this, the sooner we can process your application.
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
                instalments.
              </p>
              <p>
			   I understand that if I am unable to repay any instalment for
                any reason, I need to inform HR in advance, failing which
                the instalment will be automatically deducted from my salary.
              </p>
              <Button intent="primary" onClick={()=>{
                fetch('/api/loan_request', {
                  method: 'POST',
                  'body': `{
                    'loan_request': {
                      user: "test"
                    }
                  }`
                }).then((res)=> {
                  console.log(res.json())
                  Router.push('/borrower/loan_success')
                })
              }}>Save</Button>
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
        model: new BorrowerProfileModel(100, [{ name: "Amitabh Bachchan", email: "bachchan@amitabh.net", amount: 10000 }]),
        newBorrower: { name: "", email: "", amount: "123" }
    }
}

export default Page
