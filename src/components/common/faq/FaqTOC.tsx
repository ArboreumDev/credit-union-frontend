import { 
    Box,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    HStack,
    Text
} from "@chakra-ui/core"
import { FaQuestion } from "react-icons/fa"
import { FAQs, FaqQuestion } from "./types"

interface NavItemProps {
    q: any // TODO
    onClick: any
    isActive: bool
}

const NavItem = ({q, onClick}: NavItemProps) => (
    <Box>
        <HStack>
            <Text> {q.position}:</Text>
            <Text>{q.question}</Text>
        </HStack>
    </Box>
)
interface Props {
    questions: FAQs
    setActiveQuestionIndex: any
    activeQuestionIndex: number
}

const FaqTOC = ({questions, setActiveQuestionIndex, activeQuestionIndex}: Props) => {
    const topics = Object.values(questions)
    console.log('ts', topics)
    return (
        <Box backgroundColor='gray.100'>
            { topics && topics
                .sort((a,b) => {return a.position > b.position ? -1: 1})
                .map((q) => (
                    <NavItem 
                        q={q}
                        onClick={() => {setActiveQuestionIndex(activeQuestionIndex)}}
                        isActive={q.position==activeQuestionIndex}
                    />
            ))}
        </Box>
    )
}

export default FaqTOC