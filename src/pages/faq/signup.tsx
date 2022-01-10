import FAQJourney  from 'components/common/faq/Journey'

import {questions as signupQuestions} from "components/faq/signup"
import { FAQs } from 'components/common/faq/types'
// import { Logo } from "components/common/landing"


const SignUpJourney = () => {
    return <FAQJourney questions={signupQuestions} />
}

export default SignUpJourney


