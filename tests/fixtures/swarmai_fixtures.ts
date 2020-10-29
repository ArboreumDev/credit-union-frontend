// import { SwarmAiRequestMessage } from "lib/types"
import { SwarmAiRequestMessage } from "../../src/lib/types"

"../src/lib/types"

export const sampleAiInput = {
  risk_assessment_context: {
    central_risk_info: {
      kumr_params: [4, 5],
      beta_params: [5, 2],
    },
  },
  optimizer_context: {
    corpus_info: {
      corpus_id: "test_corpus",
    },
    novation: false,
    corpus_cash: 1400,
    supporter_cash: 200,
    loans_in_corpus: [],
    supporter_corpus_share: 0,
    risk_free_apr: 0.5,
  },
  loan_request_info: {
    request_id: "b0cc4e47-cb97-4762-838a-6f2e45ecc903",
    terms: {
      supporters: [
        {
          recommendation_risk: {
            kumr_params: [4, 5],
            beta_params: [5, 2],
          },
          trust_amount: 5000,
          supporter_id: "970dca39-f591-4ad4-b5fd-d1ba4fe55954",
        },
      ],
      borrower_info: {
        demographic_info: {
          credit_score: 650,
          income: 200000,
          education_years: 3,
        },
        borrower_id: "370dca39-f591-4ad4-b5fd-d1ba4fe55954",
      },
      amount: 50000,
      tenor: 6,
      borrower_collateral: 12500,
      request_id: "b0cc4e47-cb97-4762-838a-6f2e45ecc903",
    },
  },
} as SwarmAiRequestMessage
