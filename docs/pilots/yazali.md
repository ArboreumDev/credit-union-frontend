## LoanFlow

1. yazali registers farmers:

- kycInfo
  - documents
- loanTerms:
  - amount of land -> size of loan
  - tenor
  - interest
  - loan.status = **initiated**

2. Arboreum tries KYC via decentro API

- NO: feedback loop until farmer is kyc'ed

  - store previous failures & reasons
  - > convert decentro failure reasons to info-msg's

- YES:
  - register loan.status=**ready**

3. yazali confirms farmer wants loan to be disbursed

- create OTP password to be sent to farmer
- sent msg with loan details and OTP with instructions to pass it on to yazali to start the process

  - > loan.status = **awaiting_farmer_verification\***

- yazali enters correct password
  - > loan.status = **registering_loan**
  - call RC-api with kyc & loan info
  - RC disburses loan to yazali account
    -> success: loan.disbursed

4. Repayment: Yazali repays arboreum via rupeecircle in one lump

- loan.status == "repaid"

QUESTIONS:
RC:

- what info do they really need on the borrower?
  - e.g. housing_type?...they do not decide whether to disburse loan or not, so KYC-blurb should be enough
- what signal do they need to start the loan, as it needs to be registered for the farmer, but disbursed to yazali account

2. where is the money coming from? being stored before being disbursed to yazali? how do lenders sign up?
