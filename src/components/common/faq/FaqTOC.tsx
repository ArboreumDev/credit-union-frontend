import { 
    Box,
    LinkBox,
    LinkOverlay,
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
    isActive: boolean
}

const NavItem = ({q, onClick, isActive}: NavItemProps) => {
    const style = isActive ? "u" : ''
    return (
        <Box onClick={onClick}>
            <HStack>
                <Text as={style}> {q.position}:</Text>
                {/* <LinkOverlay onClick={onClick}> */}
                    <Text as={style}>{q.title}</Text>
                {/* </LinkOverlay> */}
            </HStack>
        </Box>
    )
}

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
                .sort((a,b) => {return a.position > b.position ? 1: -1})
                .map((q) => (
                    <NavItem 
                        q={q}
                        onClick={() => {setActiveQuestionIndex(q.position)}}
                        isActive={q.position==activeQuestionIndex}
                    />
            ))}
        </Box>
    )
}

export default FaqTOC