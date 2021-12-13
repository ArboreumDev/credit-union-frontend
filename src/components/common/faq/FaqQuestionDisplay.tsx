import { FaqQuestion } from "./types"
import {Box} from "@chakra-ui/core"

interface Props {
    q: FaqQuestion
}

const FaqQuestionDisplay  = ({q}: Props) => (
    <Box>
        {q.title}
    </Box>
)

export default FaqQuestionDisplay