import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Image,
    Text,
    Heading,
    Center,
    Stack,
    VStack
  } from '@chakra-ui/core'
import {questions} from "components/faq/signup"
import { Logo } from "components/common/landing"

const SignUpExplainer = () => {
    return (
        <Box>
    <VStack>
        <Logo />
        <Center h="40px">
            <Box>
            <Heading>
                FAQ - Wallet Setup
                </Heading>
                <Accordion>
                <AccordionItem>
                <h2>
                    <AccordionButton>
                    <Box flex='1' textAlign='left'>
                        Step 1: Creating an Algorand Wallet
                    </Box>
                    <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    {questions.clarification.answer}

                    <Box>
                        <img
                            // boxSize='sm'
                            // src='public/images/algoConnectJourney/0.png'
                            width="300px"
                            src="/images/algoConnectJouney/0.png"
                            alt='Start Screen AlgoConnect Wallet Creation'
                        />
                    </Box>
                    <h3> Read More: </h3>

                </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                <h2>
                    <AccordionButton>
                    <Box flex='1' textAlign='left'>
                        Step 2: Setup a password
                    </Box>
                    <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                This is a password that you will use to AUTHORIZE your transactions & actions
                that you do. Also, you will regularly use it to UNLOCK your wallet: 
                As it has so much sensitive information, your wallet will quickly lock itself if you're not
                using it, so that nobody can steal your funds or act as you, even if you happen
                to leave your computer unattended.

                You will also be able to change it later on, so if you just set up an account
                for trying things out, its okay to use something that you can type quickly. 
                <br/>

                <i>: Once you are managing actual serious funds, we would recommend using a serious
                password too!!`</i>
                </AccordionPanel>
                </AccordionItem>
            </Accordion>
            </Box>
        </Center>
    </VStack>
    </Box>
  )
}

export default SignUpExplainer