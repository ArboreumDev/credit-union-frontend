import FAQJourney  from 'components/common/faq/Journey'

import {questions as cryptoQuestions} from "components/faq/crypto"
import { FAQs } from 'components/common/faq/types'
// import { Logo } from "components/common/landing"


const CryptoJourney = () => {
    return <FAQJourney questions={cryptoQuestions} />
}

export default CryptoJourney

