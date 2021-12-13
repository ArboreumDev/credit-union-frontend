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
}


const FaqQuestionDisplay  = ({q}: Props) => {
    console.log('q', q)
    return ( 
        <Box>
            <VStack>
                <Heading as='h1'> {q.title} </Heading>
                <HStack> <b>tl;dr:</b><p>{q.tldr}</p> </HStack>
                {/* next js image ocmponent */}
                <Image 
                    // layout='fill'
                    width={190*3}
                    height={90*3}
                    src={q.imageSrc}
                />
                <Text as='i' fontSize='sm'> Step {q.position}: Some caption </Text>
                <Text>{q.answer}</Text>
                <Divider />
                <Heading as='h3' size='sm'> Read More: </Heading>
                <Accordion allowToggle>
                    {q.readMore && q.readMore
                        .sort((a,b) => {return a.position < b.position ? -1 : 1})
                        .map(item => (
                            <ReadMore q={item} />
                    ))}
                </Accordion>
            </VStack>
        </Box>
    )
}

export default FaqQuestionDisplay