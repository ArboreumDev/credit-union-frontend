import { User_Insert_Input } from "../../src/gql/sdk"
import { EDGE_STATUS, UserType, RiskParams } from "../../src/lib/types"
import { DEFAULT_RECOMMENDATION_RISK_PARAMS } from "../../src/lib/constant"

type User = User_Insert_Input
type EdgeTuple = [string, string, number]

// REFACTOR to user-input type
export const LENDER1: User = {
  id: "170dca39-f591-4ad4-b5fd-d1ba4fe55954",
  phone: "1234",
  first_name: "rick",
  email: "rick@galaxy.io",
  user_type: "lender",
  demographic_info: {
    education_years: 50,
    income: 400000.0,
    credit_score: 1200,
    address: "somePlace 8",
    zipCode: 40000,
    gender: "MALE",
    dob: "",
    father: {
      firstName: "dad",
      lastName: "DY",
    },
    aadharPassword: "123",
  },
  balance: 1000,
  account_details: {
    bankDetails: {
      bankName: "TESTBANK",
      accountNumber: "123",
      branchCode: "ifsc-code",
      accountType: "CURRENT",
    },
    rcAccount: {
      investor_id: "INDV-22134",
      accountNumber: "",
      branchCode: "FIXED",
    },
  },
}

export const LENDER2: User = {
  id: "270dca39-f591-4ad4-b5fd-d1ba4fe55954",
  first_name: "summer",
  phone: "1234",
  email: "summer@highschool.io",
  user_type: "lender",
  demographic_info: {
    education_years: 5,
    income: 400.0,
    credit_score: 500,
    address: "somePlace 8",
    zipCode: 40000,
    gender: "MALE",
    dob: "",
    father: {
      firstName: "dad",
      lastName: "DY",
    },
    aadharPassword: "123",
  },
  account_details: {
    bankDetails: {
      bankName: "TESTBANK",
      accountNumber: "123",
      branchCode: "ifsc-code",
      accountType: "CURRENT",
    },
    rcAccount: {
      investor_id: "INDV-22135",
      accountNumber: "",
      branchCode: "FIXED",
    },
  },
  balance: 200,
}

export const BORROWER1: User = {
  id: "370dca39-f591-4ad4-b5fd-d1ba4fe55954",
  phone: "1234",
  first_name: "morty",
  email: "morty@galaxy.io",
  user_type: "borrower",
  demographic_info: {
    education_years: 3,
    income: 300,
    credit_score: 450,
    address: "somePlace 8",
    zipCode: 40000,
    gender: "MALE",
    dob: "",
    father: {
      firstName: "dad",
      lastName: "DY",
    },
    aadharPassword: "123",
  },
  balance: 10,
  account_details: {
    bankDetails: {
      bankName: "TESTBANK",
      accountNumber: "123",
      branchCode: "ifsc-code",
      accountType: "CURRENT",
    },
    rcAccount: {
      investor_id: "",
      accountNumber: "",
      branchCode: "FIXED",
    },
  },
}

export const SUPPORTER1: User = {
  id: "970dca39-f591-4ad4-b5fd-d1ba4fe55954",
  first_name: "noobnoob",
  email: "noob@galaxy.io",
  phone: "1234",
  user_type: "lender",
  demographic_info: {
    education_years: 10,
    income: 400.0,
    credit_score: 800,
    address: "somePlace 8",
    zipCode: 40000,
    gender: "MALE",
    dob: "",
    father: {
      firstName: "dad",
      lastName: "DY",
    },
    aadharPassword: "123",
  },
  balance: 400,
  account_details: {
    bankDetails: {
      bankName: "TESTBANK",
      accountNumber: "123",
      branchCode: "ifsc-code",
      accountType: "CURRENT",
    },
    rcAccount: {
      investor_id: "INDV-22137",
      accountNumber: "",
      branchCode: "FIXED",
    },
  },
  // if wanted we can also amend the user object like this to specify their reputation directly
  recommendationRisksByRecommenderId: {
    data: [
      {
        risk_params: {
          beta_params: [19, 10],
          kumr_params: [4, 5],
        } as RiskParams,
      },
    ],
  },
}

export const SUPPORTER3: User = {
  id: "880dca39-f591-4ad4-b5fd-d1ba4fe55954",
  first_name: "scrunchy",
  email: "scrunchy@galaxy.io",
  phone: "4321scrunch",
  user_type: "lender",
  demographic_info: {
    education_years: 1,
    income: 100.0,
    credit_score: 300,
    address: "somePlace 8",
    zipCode: 40000,
    gender: "MALE",
    dob: "",
    father: {
      firstName: "dad",
      lastName: "DY",
    },
    aadharPassword: "123",
  },
  balance: 400,
  account_details: {
    bankDetails: {
      bankName: "TESTBANK",
      accountNumber: "123",
      branchCode: "ifsc-code",
      accountType: "CURRENT",
    },
    rcAccount: {
      investor_id: "INV-22348",
      accountNumber: "",
      branchCode: "FIXED",
    },
  },
}
