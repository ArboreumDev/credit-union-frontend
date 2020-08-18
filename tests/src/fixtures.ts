import { User_Insert_Input } from "../../src/gql/sdk"
import { EDGE_STATUS } from "../../src/utils/types"

type User = User_Insert_Input

// REFACTOR to user-input type
export const USER1: User = {
  id: "170dca39-f591-4ad4-b5fd-d1ba4fe55954",
  phone: "1234",
  name: "rick",
  email: "rick@galaxy.io",
  user_type: "lender",
  demographic_info: { country: "spaceland", education: "genius" },
}

export const USER2: User = {
  id: "270dca39-f591-4ad4-b5fd-d1ba4fe55954",
  name: "summer",
  phone: "1234",
  email: "summer@highschool.io",
  user_type: "lender",
  demographic_info: { country: "spaceland" },
}

export const USER3: User = {
  id: "370dca39-f591-4ad4-b5fd-d1ba4fe55954",
  phone: "1234",
  name: "morty",
  email: "morty@galaxy.io",
  user_type: "borrower",
  demographic_info: { country: "spaceland", education: "little" },
}

export const USER4: User = {
  id: "970dca39-f591-4ad4-b5fd-d1ba4fe55954",
  name: "noobnoob",
  email: "noob@galaxy.io",
  phone: "1234",
  user_type: "lender",
  demographic_info: { country: "spaceland" },
}

export const EDGE1 = {
  trust_amount: 100,
  status: EDGE_STATUS.active,
  borrower_id: USER3.id,
  lender_id: USER1.id
}

export const EDGE2 = {
  trust_amount: 40,
  status: EDGE_STATUS.active,
  borrower_id: USER3.id,
  lender_id: USER2.id,
}
