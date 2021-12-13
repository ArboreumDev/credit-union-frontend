import FAQ from "pages/faq"
import FaqQuestionDisplay from "components/common/faq/FaqQuestionDisplay"
import FaqTOC from "components/common/faq/FaqTOC"

const fixtures = {
   q1: {
      question: "question1",
      title: "title1",
      answer: "answer1",
      tldr: "tldr1",
      position: 0,
      imageSrc: "",
      readMore: [],
   },
   q2: {
      question: "question2",
      title: "title2",
      answer: "answer1",
      tldr: "tldr1",
      position: 0,
      imageSrc: "",
      readMore: [],
   }
}

export default {
    faq: <FAQ />,
    question: <FaqQuestionDisplay q={fixtures.q1} />,
    toc: <FaqTOC 
      questions={fixtures}
      setActiveQuestionIndex={()=>{console.log('sfd')}} 
      activeQuestionIndex={0}
   />
}
