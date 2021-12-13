import FAQ from "pages/faq/signup"
import FaqQuestionDisplay from "components/common/faq/FaqQuestionDisplay"
import FaqTOC from "components/common/faq/FaqTOC"
import SignUpJourney from "pages/faq/signup"

const fixtures = {
   q1: {
      question: "question1",
      title: "title1",
      answer: "answer1",
      tldr: "tldr1",
      position: 0,
      imageSrc: "/images/algoConnectJourney/0.png",
      readMore: [
         {
            question: "followupquestion1",
            answer: "follup answer1",
            position: 0
         },
         {
            question: "followupquestion2",
            answer: "follup answer2",
            position: 1
         }
      ],
   },
   q2: {
      question: "question2",
      title: "title2",
      answer: "answer2",
      tldr: "tldr2",
      position: 0,
      imageSrc: "/images/algoConnectJourney/1.png",
      readMore: [],
   }
}

export default {
    faq: <SignUpJourney />,
    question: <FaqQuestionDisplay q={fixtures.q1} />,
    toc: <FaqTOC 
      questions={fixtures}
      setActiveQuestionIndex={()=>{console.log('sfd')}} 
      activeQuestionIndex={0}
   />
}
