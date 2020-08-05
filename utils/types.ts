export type SessionUser = {
        name: string
        email: string
        image: string
    }

export type Session = {
    user: SessionUser
    accessToken: string
    expires: string
    profile?: User
}

export enum UserType {
    Borrower="borrower",
    Lender="lender"
}

export type User = {
    name: string
    email: string
    phone: string
    user_type: UserType
}