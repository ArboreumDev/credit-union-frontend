export interface SessionUser {
        name: string;
        email: string;
        image: string;
    }

export interface Session {
    user: SessionUser;
    accessToken: string;
    expires: string;
}

export enum UserType {
    Borrower,
    Lender
}

export interface User {
    name: string
    type: UserType
}