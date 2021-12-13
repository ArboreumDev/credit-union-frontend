import {
    Box,
    Heading,
    Grid,
    GridItem,
  } from '@chakra-ui/core'
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import differenceInQuartersWithOptions from 'date-fns/esm/fp/differenceInQuartersWithOptions/index.js'
import { useEffect, useState } from 'react'
import FaqQuestionDisplay from 'components/common/faq/FaqQuestionDisplay'
import FaqTOC from 'components/common/faq/FaqTOC'
import { FAQs, FaqQuestion  } from 'components/common/faq/types'

import {questions as questionObject} from "components/faq/signup"
// import { Logo } from "components/common/landing"


const FAQ = () => {
    const questions: FAQs = questionObject
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

    const indexToActiveQuestion = (i: number) => {
        const q =  Object.values(questions).filter(q => q.position == i)[0]
        console.log('qu', q)
        return {
                question: "question1",
                title: "title1",
                answer: "answer1",
                tldr: "tldr1",
                position: 0,
                imageSrc: "",
                readMore: [],
        }
    }

    return (
        <Box>
            <Heading>FAQ</Heading>
            <Grid
                h='200px'
                templateRows='repeat(1, 1fr)'
                templateColumns='repeat(4, 1fr)'
                gap={4}
            >
                <GridItem colSpan={3}>
                    <FaqQuestionDisplay q={indexToActiveQuestion(activeQuestionIndex)}/>
                </GridItem>
                <GridItem colSpan={1} >
                    <FaqTOC 
                        questions={questions}
                        activeQuestionIndex={activeQuestionIndex}
                        setActiveQuestionIndex={setActiveQuestionIndex}
                    />
                </GridItem>
            </Grid>
        </Box>
    )
}

export default FAQ

// const SignUpExplainer = () => {
//     return (
//         <Box>
//     <VStack>
//         <Logo />
//         <Center h="40px">
//             <Box>
//             <Heading>
//                 FAQ - Wallet Setup
//                 </Heading>
//                 <Accordion>
//                 <AccordionItem>
//                 <h2>
//                     <AccordionButton>
//                     <Box flex='1' textAlign='left'>
//                         Step 1: Creating an Algorand Wallet
//                     </Box>
//                     <AccordionIcon />
//                     </AccordionButton>
//                 </h2>
//                 <AccordionPanel pb={4}>
//                     {questions.clarification.answer}

//                     <Box>
//                         <img
//                             // boxSize='sm'
//                             // src='public/images/algoConnectJourney/0.png'
//                             width="300px"
//                             src="/images/algoConnectJouney/0.png"
//                             alt='Start Screen AlgoConnect Wallet Creation'
//                         />
//                     </Box>
//                     <h3> Read More: </h3>

//                 </AccordionPanel>
//                 </AccordionItem>
//                 <AccordionItem>
//                 <h2>
//                     <AccordionButton>
//                     <Box flex='1' textAlign='left'>
//                         Step 2: Setup a password
//                     </Box>
//                     <AccordionIcon />
//                     </AccordionButton>
//                 </h2>
//                 <AccordionPanel pb={4}>
//                 This is a password that you will use to AUTHORIZE your transactions & actions
//                 that you do. Also, you will regularly use it to UNLOCK your wallet: 
//                 As it has so much sensitive information, your wallet will quickly lock itself if you're not
//                 using it, so that nobody can steal your funds or act as you, even if you happen
//                 to leave your computer unattended.

//                 You will also be able to change it later on, so if you just set up an account
//                 for trying things out, its okay to use something that you can type quickly. 
//                 <br/>

//                 <i>: Once you are managing actual serious funds, we would recommend using a serious
//                 password too!!`</i>
//                 </AccordionPanel>
//                 </AccordionItem>
//             </Accordion>
//             </Box>
//         </Center>
//     </VStack>
//     </Box>
//   )
// }

// export default SignUpExplainer