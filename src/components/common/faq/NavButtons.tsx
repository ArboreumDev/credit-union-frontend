import { Button, Spacer, Box, Center, HStack } from "@chakra-ui/core"

interface Props {
    max: number
    setActiveQuestionIndex: any
    activeQuestionIndex: number
}

const NavButtons = ({max, setActiveQuestionIndex, activeQuestionIndex}: Props) => {
    const isLast = activeQuestionIndex === max-1
    return (
        <Center>
            <Box>
            <HStack>
                <Button 
                    width='150px'
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex -1)}
                    disabled={activeQuestionIndex === 0}
                    >{'< go back'}</Button>
                <Spacer />
                <Button 
                    width='150px'
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                    disabled={isLast}
                    >{'see next step >'}</Button>
            </HStack>
            </Box>
        </Center>
    )
}

export default NavButtons