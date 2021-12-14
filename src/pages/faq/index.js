import Link from 'next/link'
import { 
    Box,
    Text,
    VStack,
} from "@chakra-ui/core"
import FaqLayout from "../../components/common/faq/FaqLayout"



export default () => (
    <FaqLayout>
        <Box>
            <Text>
                What do you want to learn about?
            </Text>
            <VStack>
                <Link href="/faq/signup"><a> {'>'} Creating an Algorand Wallet?</a></Link>
                <Link href="/faq/transactions"><a>{'>'} Using your wallet to sign transactions (TODO)</a></Link>
                <Link href="/faq/transactions"><a>{'>'} Depositing & withdrawing from your account (TODO)</a></Link>
            </VStack>
        </Box>

    </FaqLayout>

)
