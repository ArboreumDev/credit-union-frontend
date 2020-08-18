export type Session = {
    user: User
    accessToken: string
    expires: string
}

export enum UserType {
    Borrower="borrower",
    Lender="lender"
}

export type User = {
    name: string
    email: string
    image: string
    phone: string
    user_type: UserType
}