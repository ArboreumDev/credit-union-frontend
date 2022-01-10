import {
    Box,
    Heading,
    Grid,
    GridItem,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
  } from '@chakra-ui/core'
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import differenceInQuartersWithOptions from 'date-fns/esm/fp/differenceInQuartersWithOptions/index.js'
import { useEffect, useState } from 'react'
import FaqQuestionDisplay from 'components/common/faq/FaqQuestionDisplay'
import FaqLayout from 'components/common/faq/FaqLayout'
import FaqTOC from 'components/common/faq/FaqTOC'
import { FAQs, FaqQuestion  } from 'components/common/faq/types'

import {questions as questionObject} from "components/faq/signup"
// import { Logo } from "components/common/landing"


export const BreadCrumb = ({currentTitle}) => {
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink href='/faq'>FAQ</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href='/faq/signup'>SignUp</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href='#'>{currentTitle}</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )

}
export interface Props {
    questions: FAQs

}

const FAQJourney = ({questions}: Props) => {
    // const questions: FAQs = questionObject
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

    const indexToActiveQuestion = (i: number) => {
        const q =  Object.values(questions).filter(q => q.position == i)[0]
        console.log('qu', q)
        return q 
    }

    return (
        <FaqLayout>
        <Box>
            <BreadCrumb 
                currentTitle={indexToActiveQuestion(activeQuestionIndex).title}
            />
           <Grid
                h='200px'
                templateRows='repeat(1, 1fr)'
                templateColumns='repeat(4, 1fr)'
                gap={4}
            >
                <GridItem colSpan={3}>
                    <FaqQuestionDisplay 
                        q={indexToActiveQuestion(activeQuestionIndex)}
                        activeQuestionIndex={activeQuestionIndex}
                        setActiveQuestionIndex={setActiveQuestionIndex}
                        lastQIndex={Object.values(questions).length}
                    />
                    
                </GridItem>
                <GridItem colSpan={1} backgroundColor='gray.100' >
                    <FaqTOC 
                        questions={questions}
                        activeQuestionIndex={activeQuestionIndex}
                        setActiveQuestionIndex={setActiveQuestionIndex}
                    />
                </GridItem>
            </Grid>
        </Box>
        </FaqLayout>
    )
}

export default FAQJourney
