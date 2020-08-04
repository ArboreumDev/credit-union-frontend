export interface Session {
    user: {
        name: string;
        email: string;
        image: string;
    };
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