import { Button, Spacer, Box, Center } from "@chakra-ui/core"

interface Props {
    max: number
    setActiveQuestionIndex: any
    activeQuestionIndex: number
}

const NavButtons = ({max, setActiveQuestionIndex, activeQuestionIndex}: Props) => {
    const isLast = activeQuestionIndex === max-1
    return (
        <Center>
            <Spacer />
            <Box>
                <Button 
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex -1)}
                    disabled={activeQuestionIndex === 0}
                >{'< go back'}</Button>
                <Button 
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                    disabled={isLast}
                >{'see next step >'}</Button>
            </Box>
            <Spacer />
        </Center>
    )
}

export default NavButtons