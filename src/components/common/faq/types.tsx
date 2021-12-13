export interface ReadMoreItem {
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
    readMore : Array<ReadMoreItem>
}

export interface FAQs {
    [subject: string]: FaqQuestion
}


