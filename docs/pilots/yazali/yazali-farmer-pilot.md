## LoanFlow

1. yazali registers farmers:

- kycInfo
  - documents
  - TODO fill out info
- loanTerms:
  - amount of land -> size of loan
  - tenor

2. Arboreum tries KYC via decentro API
   - NO: feedback loop until farmer is kyc'ed
   - > convert decentro failure reasons to info-msg's

- YES:
  - register loan in status 'ready'

3. yazali confirms farmer wants loan to be disbursed

- create OTP password to be sent to farmer
- sent msg with loan details and OTP with instructions to pass it on to yazali to start the process

  - > loan.status = awaiting_farmer_verification

- yazali enters correct password
  - > loan.status = registering_loan
  - call RC-api with kyc & loan info
