import React, { useState } from 'react'
import { Card, FormGroup, InputGroup, H5, NumericInput, Button } from '@blueprintjs/core';
import AppBar from '../components/AppBar';
import { getSession } from 'next-auth/client'

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
    session: Session,
    model: ProfileModel
}

const Page = (params:Params) => {
    
    const session = params.session
    const [state, setState] = useState(params.model);
    
    // console.log(params.session)
    return (<div className='container'>
        <AppBar session={session} />
        <div className="center">
        <Card className="profile-card">
            <H5>
                Profile
            </H5>
            <p>
               {session.user.name}
            </p>
            <p> {session.user.email}</p>
            
        </Card>
        <Card className="profile-card">
            <H5>
                Total Exposure
            </H5>
            <p>
                Maximum amount you wish to loan out, in INR? This will be your total exposure across corpus and guarantee investments.
                
            </p>
            <p>(For the trial period of this program, this is a minimum 2-month commitment)</p>
            
           
                <NumericInput
                    value={state.max_exposure}
                    onValueChange={(value)=> setState(prevState =>{
                            return { ...prevState, max_exposure: value }
                        })
                    }
                    stepSize={100}
                    majorStepSize={1000}
                    minorStepSize={10}
                    large />
        </Card>
        <Card className="profile-card">
            <H5>
                Minimum Interest Rate
            </H5>
            <p>
                What is the minimum interest rate you desire for your portfolio, on a % per annum basis?
                Higher interest expectation will correspond to riskier investments
                 
            </p>
            
                <NumericInput 
                    value={state.min_interest_rate} 
                    onValueChange={(value) => setState(prevState => {
                        return { ...prevState, min_interest_rate: value }
                    })
                    }
                    stepSize={1}
                    large />
        </Card>
        <Card className="profile-card">
            <Card>
                <H5>
                    Trusted Borrowers
            </H5>
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            state.borrowers.map((borrower, idx) => (

                                <tr key={'b_td_'+idx}>
                                    <td>{borrower.name}</td>
                                    <td>{borrower.email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Card>
            
            <Card>
                
                <FormGroup
                    helperText=""
                    label=""
                    labelFor="text-input"
                    labelInfo=""
                >
                    <InputGroup id="text-input" width={200} placeholder={"name"} />
                    <InputGroup id="text-input" width={200} placeholder={"email"} />
                    <Button onClick={
                            () => setState(prevState => {
                                let b = prevState.borrowers
                                b.push({name: 'gag', email:'emaa', amount: 100})
                                return { ...prevState, borrowers: b }
                            })
                        }>
                            Add</Button>
                </FormGroup>

            </Card>
            
            
        </Card>
        <style jsx>{`
       .center {
                margin: auto;
                width: 50%;
                padding: 10px;
            }
            .profile_card {
                margin: "10px";
            `
            }
        </style>
        </div>
        
        </div>)
}
 
Page.getInitialProps = async (context) => {
    return {
        session: await getSession(context),
        model: new ProfileModel(100, 200, [{ name: "a", email: "b", amount: 10 }])
    }
}

export default Page
