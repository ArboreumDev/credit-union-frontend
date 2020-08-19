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
  user_number: 1,
  balance: 1000
}

export const USER2: User = {
  id: "270dca39-f591-4ad4-b5fd-d1ba4fe55954",
  name: "summer",
  phone: "1234",
  email: "summer@highschool.io",
  user_type: "lender",
  demographic_info: { country: "spaceland" },
  user_number: 2,
  balance: 200
}

export const USER3: User = {
  id: "370dca39-f591-4ad4-b5fd-d1ba4fe55954",
  phone: "1234",
  name: "morty",
  email: "morty@galaxy.io",
  user_type: "borrower",
  demographic_info: { country: "spaceland", education: "little" },
  user_number: 3,
  balance: 10
}

export const USERS = [USER1, USER2, USER3]

export const USER4: User = {
  id: "970dca39-f591-4ad4-b5fd-d1ba4fe55954",
  name: "noobnoob",
  email: "noob@galaxy.io",
  phone: "1234",
  user_type: "lender",
  demographic_info: { country: "spaceland" },
  user_number: 4,
  balance: 2000
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

export const EDGES = [[1,3,100], [2,3,40]]

// example how the network above would be to network-x format
const basic_connections = EDGES
const basic_nodes = [1,3,2]
export const BASIC_NETWORK = {nodes: basic_nodes, edges: basic_connections}