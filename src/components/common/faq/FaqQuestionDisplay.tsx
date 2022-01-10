import { FaqQuestion, ReadMoreItem} from "./types"
import {Divider, Text,Box, HStack, VStack,   Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Img,
    AccordionIcon,
    Heading
} from "@chakra-ui/core"
import Image from 'next/image'
import NavButtons from 'components/common/faq/NavButtons'
// import im0 from  "../../../../public/images/algoConnectJourney/0.png"
// import im0 from  "/images/algoConnectJourney/0.png"


interface ReadMoreProps {
    q: ReadMoreItem
}

const ReadMore = ({q}: ReadMoreProps) => (
  <AccordionItem key={`readMore${q.position}`}>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          {q.question}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
        {q.answer}
    </AccordionPanel>
  </AccordionItem>
)
interface Props {
    q: FaqQuestion
    lastQIndex: number
    setActiveQuestionIndex: any
    activeQuestionIndex: number
}


const FaqQuestionDisplay  = ({q, lastQIndex, activeQuestionIndex, setActiveQuestionIndex}: Props) => {
    console.log('q', q)
    return ( 
        <Box>
            <VStack>
                <Heading as='h1'> {q.question} </Heading>
                <Text as='i'>
                    <b>tl;dr:</b>

                    {q.tldr}
                </Text>
                {/* next js image ocmponent */}
                {q.imageSrc && (
                    <>
                        <Image 
                        // layout='fill'
                        width={190*3}
                        height={90*3}
                        src={q.imageSrc}
                        />
                        <Text as='i' fontSize='sm'> Step {q.position}: {q.caption} </Text>
                    </>
                )}
                <Text>{q.answer}</Text>
                <Divider />
                <NavButtons 
                    max={lastQIndex}
                    setActiveQuestionIndex={setActiveQuestionIndex}
                    activeQuestionIndex={activeQuestionIndex}
                />
                <Divider />
                {q.readMore.length && (
                    <>
                        <Text>Or <Text as='b'> Read More:</Text> </Text>
                        <Accordion allowToggle>
                            {q.readMore
                            .sort((a,b) => {return a.position < b.position ? -1 : 1})
                            .map(item => (
                                <ReadMore q={item} />
                            ))}
                        </Accordion>
                    </>
                )}
            </VStack>
        </Box>
    )
}

export default FaqQuestionDisplay