import { CircleAccountInfo } from "gql/wallet/circle_client"
export class CircleFixtures {
  static registeredUserIds = [
    // userIds used to create circle accounts
    "370dca39-f591-4ad4-b5fd-d1ba4fe55954",
    "170dca39-f591-4ad4-b5fd-d1ba4fe55954",
    "270aca39-f591-4ad4-b5fd-d1ba4fe55954",
    "970dca39-f591-4ad4-b5fd-d1ba4fe55954",
    "988dca39-f591-4ad4-b5fd-d1ba4fe55954",
    "880dca39-f591-4ad4-b5fd-d1ba4fe55954",
  ]
  static accounts = {
    sampleWithHistory: {
      accountId: "547df812-d4c9-4d25-8d52-e7970ab0d962",
      walletId: "1000088128",
      entityId: "1259386a-7aa3-4ebd-be70-9c7b9c017bf9",
      ethAddress: "0x86c19a96fae6e2c615f7ad87f498f304409e3b7a",
      algoAddress: "OAQJOCLUKGJF3BR5GJWFDZ5IC43OLVCF56ODGUCZ6LJXGQG2HHFMIHPREM",
      trackingRef: "CIR3HD8QHW",
      wireDepositAccount: {
        owner: "CIRCLE INTERNET FINANCIAL INC",
        bankDetails: {
          bankName: "CRYPTO BANK",
          swiftCode: "CRYPTO99",
          routingNumber: "999999999",
          accountNumber: "1000000001",
          iban: "",
          branchCode: "",
          bankAddress: {
            line1: "1 MONEY STREET",
            line2: "",
            city: "NEW YORK",
            country: "US",
            district: "",
            postalCode: "1001",
          },
        },
      },
      deposits: {
        pending: [],
        settled: [
          {
            id: "096ea0b7-369d-443c-90f7-c15d475d0368",
            type: "payment",
            merchantId: "1259386a-7aa3-4ebd-be70-9c7b9c017bf9",
            merchantWalletId: "1000080455",
            source: ["TODO"],
            description: "Merchant Push Payment",
            amount: ["TODO"],
            fees: ["todo"],
            status: "paid",
            refunds: [],
            createDate: "2021-04-30T13:20:00.748Z",
            updateDate: "2021-04-30T13:29:01.088Z",
          },
          {
            id: "9a8c79b0-6041-4fc5-84c5-367472f43ce0",
            type: "payment",
            merchantId: "1259386a-7aa3-4ebd-be70-9c7b9c017bf9",
            merchantWalletId: "1000080455",
            source: ["todo"],
            description: "Merchant Push Payment",
            amount: ["todo"],
            fees: ["todo"],
            status: "paid",
            refunds: [],
            createDate: "2021-04-29T13:30:00.902Z",
            updateDate: "2021-04-29T13:44:01.426Z",
          },
        ],
        total: 2,
      },
      history: [
        {
          type: "Withdrawal",
          amount: "1.00",
          createDate: "2021-05-04T16:14:58.267Z",
          destination: "ALGO",
          source: "Wallet",
          status: "complete",
          details: {
            id: "a6478295-4acf-48bc-ba86-02259955b31e",
            source: {
              type: "wallet",
              id: "1000088128",
            },
            destination: {
              type: "blockchain",
              address:
                "FEIYSKZZKP6LIZW7FTQSLTIHZTYTPI2MEW3R3BBSWWCRPJNJWWCMH2YWOY",
              chain: "ALGO",
            },
            amount: {
              amount: "1.00",
              currency: "USD",
            },
            transactionHash:
              "7GKUL42VPQUKAX5WD5R2P4S3CSIPAH7NH2PHONSKCNPUN4TDHWJA",
            status: "complete",
            createDate: "2021-05-04T16:14:58.267Z",
          },
        },
        {
          type: "Withdrawal",
          amount: "1.00",
          status: "complete",
          createDate: "2021-05-04T16:14:57.930Z",
          destination: "ETH",
          source: "Wallet",
          details: {
            id: "e9275778-667c-4bdb-81a8-e785415cf6bc",
            source: {
              type: "wallet",
              id: "1000088128",
            },
            destination: {
              type: "blockchain",
              address: "0x2Db98f725Ce52ddAf5dC8c87d3b32b258DE8117b",
              chain: "ETH",
            },
            amount: {
              amount: "1.00",
              currency: "USD",
            },
            transactionHash:
              "0xa2d90dcfd0de123b13a1ab46453e3c94379f8b3c0d08d8e8fedad8a2e9184570",
            status: "complete",
            createDate: "2021-05-04T16:14:57.930Z",
          },
        },
        {
          type: "Deposit",
          amount: "300.00",
          status: "complete",
          destination: "Wallet",
          source: "Bank",
          createDate: "2021-04-30T13:38:56.812Z",
          details: {
            id: "dfe209de-1a84-4112-86af-d281a1fad538",
            source: ["todo"],
            destination: "",
            amount: [""],
            status: "complete",
            createDate: "2021-04-30T13:38:56.812Z",
          },
        },
        {
          type: "Withdrawal",
          amount: "1.10",
          status: "pending",
          destination: "Bank",
          source: "Wallet",
          createDate: "2021-05-06T10:35:51.199Z",
          details: {
            id: "f8581421-39c2-4d64-9ea8-717dea0a9f77",
            amount: { amount: "1.10", currency: "USD" },
            status: "pending",
            sourceWalletId: "1000088128",
            destination: {
              type: "wire",
              id: "547df812-d4c9-4d25-8d52-e7970ab0d962",
              name: "Commerzbank GF-B48 ****3000",
            },
            createDate: "2021-05-06T10:35:51.199Z",
            updateDate: "2021-05-06T10:35:51.274Z",
          },
        },
      ],
    },

    ["370dca39-f591-4ad4-b5fd-d1ba4fe55954"]: {
      // created by userId of Borrower1
      entityId: "1259386a-7aa3-4ebd-be70-9c7b9c017bf9",
      walletId: "1000089215",
      accountId: "547df812-d4c9-4d25-8d52-e7970ab0d962",
      ethAddress: "0xa8288aac77d7210314729a183c9e6a58f82b8d62",
      algoAddress: "UDEUDM2YO32TM7GBFFM7BFUZK5IOZPUZYZXNYTVO3F4ZPKZP4DZB6JZAYU",
      trackingRef: "CIR3HD8QHW",
      wireDepositAccount: {
        owner: "CIRCLE INTERNET FINANCIAL INC",
        bankDetails: {
          iban: "",
          bankName: "CRYPTO BANK",
          swiftCode: "CRYPTO99",
          branchCode: "",
          bankAddress: [""],
          accountNumber: "1000000001",
          routingNumber: "999999999",
        },
      },
      history: [],
      deposits: {
        settled: [],
        pending: [],
        total: 0,
      },
    },
    ["170dca39-f591-4ad4-b5fd-d1ba4fe55954"]: {
      // created by userId of Lender1
      entityId: "1259386a-7aa3-4ebd-be70-9c7b9c017bf9",
      walletId: "1000089157",
      accountId: "e187e770-f23c-498f-b5fd-1d6812ba7167",
      ethAddress: "0x91cc6a4f204d00052304e8a442f4a7fdd902b4c6",
      algoAddress: "DE7CWQVFI2TGIC7G2GKFKBRXS2QYAYICAWHN4P272UQ2EUNZ6OLWDXNQZE",
      trackingRef: "CIR2SHGZL3",
      wireDepositAccount: {
        owner: "CIRCLE INTERNET FINANCIAL INC",
        bankDetails: {
          iban: "",
          bankName: "CRYPTO BANK",
          swiftCode: "CRYPTO99",
          branchCode: "",
          bankAddress: [""],
          accountNumber: "1000000001",
          routingNumber: "999999999",
        },
      },
      history: [],
      deposits: {
        settled: [],
        pending: [],
        total: 0,
      },
    },
    ["270aca39-f591-4ad4-b5fd-d1ba4fe55954"]: {
      // created by userId of Lender2
      entityId: "1259386a-7aa3-4ebd-be70-9c7b9c017bf9",
      walletId: "1000121984",
      accountId: "b5dc9d58-5746-44ff-82c7-fc6f7833416c",
      ethAddress: "0x06570d67782e0440c8eec366a406d836252d20c1",
      algoAddress: "ILN3TECSQGWMMUHHVOOXJRYUQT5VQIN4ZKSAU7BV2PXNVP635UTXMLHLNU",
      trackingRef: "CIR2KBSJPJ",
      wireDepositAccount: {
        owner: "CIRCLE INTERNET FINANCIAL INC",
        bankDetails: {
          iban: "",
          bankName: "CRYPTO BANK",
          swiftCode: "CRYPTO99",
          branchCode: "",
          bankAddress: [""],
          accountNumber: "1000000001",
          routingNumber: "999999999",
        },
      },
      history: [],
      deposits: {
        settled: [],
        pending: [],
        total: 0,
      },
    },

    ["970dca39-f591-4ad4-b5fd-d1ba4fe55954"]: {
      // created by userId of supporter1
      entityId: "1259386a-7aa3-4ebd-be70-9c7b9c017bf9",
      walletId: "1000121987",
      accountId: "b6a07169-69ca-485e-83f4-0b7ebdacb996",
      ethAddress: "0x695089872200b27f519613a4a3e3416068a03265",
      algoAddress: "HSN4BADOBQV46XOCAV66WRZTKFESGZHQG54QBB5LZD4IPPBZAWRG5FLUVU",
      trackingRef: "CIR3TSYFA9",
      wireDepositAccount: {
        owner: "CIRCLE INTERNET FINANCIAL INC",
        bankDetails: {
          iban: "",
          bankName: "CRYPTO BANK",
          swiftCode: "CRYPTO99",
          branchCode: "",
          bankAddress: [""],
          accountNumber: "1000000001",
          routingNumber: "999999999",
        },
      },
      history: [],
      deposits: {
        settled: [],
        pending: [],
        total: 0,
      },
    },

    ["988dca39-f591-4ad4-b5fd-d1ba4fe55954"]: {
      // created by userId of supporter2
      entityId: "1259386a-7aa3-4ebd-be70-9c7b9c017bf9",
      walletId: "1000121997",
      accountId: "b281766f-307b-4938-93bd-44633d820b0a",
      ethAddress: "0x1386a2710246cf97f661560925df93834abad1c4",
      algoAddress: "XHLA3XGUBDMJ3JAAO72PENDUG3Y6R2AY4PEV6EUKKFJV54OUXGIV33L3EE",
      trackingRef: "CIR2NFFMT9",
      wireDepositAccount: {
        owner: "CIRCLE INTERNET FINANCIAL INC",
        bankDetails: {
          iban: "",
          bankName: "CRYPTO BANK",
          swiftCode: "CRYPTO99",
          branchCode: "",
          bankAddress: [""],
          accountNumber: "1000000001",
          routingNumber: "999999999",
        },
      },
      history: [],
      deposits: {
        settled: [],
        pending: [],
        total: 0,
      },
    },
    ["880dca39-f591-4ad4-b5fd-d1ba4fe55954"]: {
      // created by userId of supporter3
      entityId: "1259386a-7aa3-4ebd-be70-9c7b9c017bf9",
      walletId: "1000121990",
      accountId: "d22ddeeb-c253-4ef2-afb2-341b06f6d7a8",
      ethAddress: "0xc519ab9c6eaa9666a192ec2ea4854854aec4a5fc",
      algoAddress: "CGYKJ75QGETBGPUDDCGRCVUNPREG7GJFY4FZD6LTL2TMFO4WEF3RKUAMNM",
      trackingRef: "CIR388GZXS",
      wireDepositAccount: {
        owner: "CIRCLE INTERNET FINANCIAL INC",
        bankDetails: {
          iban: "",
          bankName: "CRYPTO BANK",
          swiftCode: "CRYPTO99",
          branchCode: "",
          bankAddress: ["TODO"],
          accountNumber: "1000000001",
          routingNumber: "999999999",
        },
      },
    },
    history: [],
    deposits: {
      settled: [],
      pending: [],
      total: 0,
    },
  }
}
