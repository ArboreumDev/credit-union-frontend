import { User_Insert_Input, Edges_Insert_Input } from "../../src/gql/sdk"
import { EDGE_STATUS, UserType } from "../../src/utils/types"
import { generateEdgeInputFromTupleNotation } from "../../src/utils/network_helpers"

type User = User_Insert_Input
type EdgeTuple = [User, User, number]

// REFACTOR to user-input type
export const LENDER1: User = {
  id: "170dca39-f591-4ad4-b5fd-d1ba4fe55954",
  phone: "1234",
  name: "rick",
  email: "rick@galaxy.io",
  user_type: "lender",
  demographic_info: { country: "spaceland", education: "genius" },
  user_number: 1,
  balance: 1000,
}

export const LENDER2: User = {
  id: "270dca39-f591-4ad4-b5fd-d1ba4fe55954",
  name: "summer",
  phone: "1234",
  email: "summer@highschool.io",
  user_type: "lender",
  demographic_info: { country: "spaceland" },
  user_number: 2,
  balance: 200,
}

export const BORROWER1: User = {
  id: "370dca39-f591-4ad4-b5fd-d1ba4fe55954",
  phone: "1234",
  name: "morty",
  email: "morty@galaxy.io",
  user_type: "borrower",
  demographic_info: { country: "spaceland", education: "little" },
  user_number: 3,
  balance: 10,
}

export const USERS = [LENDER1, LENDER2, BORROWER1]

export const SUPPORTER1: User = {
  id: "970dca39-f591-4ad4-b5fd-d1ba4fe55954",
  name: "noobnoob",
  email: "noob@galaxy.io",
  phone: "1234",
  user_type: "lender",
  demographic_info: { country: "spaceland" },
  user_number: 4,
  balance: 200,
}

export const EDGES: EdgeTuple[] = [
  [LENDER1.id, BORROWER1.id, 100],
  [LENDER2.id, BORROWER1.id, 40],
]

export const EDGE1 = generateEdgeInputFromTupleNotation(EDGES[0])
export const EDGE2 = generateEdgeInputFromTupleNotation(EDGES[1])

export const BASIC_NETWORK = { nodes: USERS, edges: EDGES }
