export type Session = {
  user: User;
  accessToken: string;
  expires: string;
};

export enum UserType {
  Borrower = "borrower",
  Lender = "lender",
}

export type User = {
  name: string;
  email: string;
  image: string;
  phone: string;
  user_type: UserType;
};

export enum EDGE_STATUS {
  active = "active",
  awaiting_lender_confirmation = "awaiting_lender_confirmation",
  awaiting_lender_signup = "awaiting_lender_signup",
  awaiting_borrower_signup = "awaiting_borrower_signup",
  historic = "historic",
}
