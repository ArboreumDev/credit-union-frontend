import { Button, Spacer, Box, Center } from "@chakra-ui/core"

interface Props {
    max: number
    setActiveQuestionIndex: any
    activeQuestionIndex: number
}

const NavButtons = ({max, setActiveQuestionIndex, activeQuestionIndex}: Props) => {
    return (
        <Center>
            <Spacer />
            <Box>
                <Button 
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex -1)}
                    disabled={activeQuestionIndex === 0}
                >{'<'}</Button>
                <Button 
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                    disabled={activeQuestionIndex === max-1}
                >{'>'}</Button>
            </Box>
            <Spacer />
        </Center>
    )
}

export default NavButtons