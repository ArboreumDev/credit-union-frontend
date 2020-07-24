import React from 'react'
import UserConfig from '../components/UserConfig';
import { useStore } from '../stores/root';
import { observer } from 'mobx-react-lite';
import { Card, FormGroup, InputGroup, H5, NumericInput } from '@blueprintjs/core';

// import GoogleLogin, { GoogleLogout } from '../dist/google-login'
// import FontAwesome from 'react-fontawesome';


export default observer(() => {
    const store = useStore()

    return <div className="profile-container">
        <Card className="profile-card">
            <H5>
                Total Exposure
            </H5>
            <p>
                Maximum amount you wish to loan out, in INR? This will be your total exposure across corpus and guarantee investments.
                
            </p>
            <p>(For the trial period of this program, this is a minimum 2-month commitment)</p>
            
            <FormGroup
                helperText=""
                label=""
                labelFor="total-exposure-input"
                labelInfo="(required)"
            >
                <NumericInput />
            </FormGroup>
        </Card>
        <Card className="profile-card">
            <H5>
                Minimum Interest Rate
            </H5>
            <p>
                What is the minimum interest rate you desire for your portfolio, on a % per annum basis?
                Higher interest expectation will correspond to riskier investments
                 
            </p>
            <FormGroup
                helperText=""
                label=""
                labelFor="total-exposure-input"
                labelInfo="(required)"
            >
                <NumericInput />
            </FormGroup>
        </Card>
        <Card className="profile-card">
            <H5>
                Trusted Borrowers
            </H5>
            
            <FormGroup
                helperText=""
                label=""
                labelFor="total-exposure-input"
                labelInfo="(required)"
            >
            </FormGroup>
        </Card>
        <style jsx>{`
            .profile-container {

            }
            .profile_card {
                margin: "10px";
            `
            }
        </style>
        </div>
})