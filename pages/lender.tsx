import React from 'react'
import UserConfig from '../components/UserConfig';
import { useStore } from '../stores/root';
import { observer } from 'mobx-react-lite';
import { Card, FormGroup, InputGroup, H5, NumericInput, Button } from '@blueprintjs/core';

// import GoogleLogin, { GoogleLogout } from '../dist/google-login'
// import FontAwesome from 'react-fontawesome';


export default observer(() => {
    const store = useStore()

    return <div className="center">
        <Card className="profile-card">
            <H5>
                Profile
            </H5>
            <p>
               {store.session.user.name}
            </p>
            <p> {store.session.user.email}</p>
            
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
                    value={store.fin_params.min_interest_rate}
                    onValueChange={store.fin_params.updateMinInterestRate}
                    stepSize={1}
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
                    value={store.fin_params.max_exposure} 
                    onValueChange={store.fin_params.updateMaxExposure}
                    stepSize={100}
                    majorStepSize={1000}
                    minorStepSize={10}
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

                            store.fin_params.borrowers.map((borrower) => (

                                <tr key={borrower.email}>
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
                    <Button>Add</Button>
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
})