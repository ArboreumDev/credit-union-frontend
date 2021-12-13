export interface ReadMore {
    question: string
    answer: string
    position: number
 
}

export interface FaqQuestion {
    title: string
    position: number
    question: string
    answer: string
    imageSrc: string
    tldr: string
    readMore : Array<ReadMore>
}

export interface FAQs {
    [subject: string]: FaqQuestion
}


