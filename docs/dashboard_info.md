### Borrower

- how to derive upcoming payments and total outstanding debt?

### Lender

Currently shown in the dashboard:

- **total assets**: invested + uninvested
- **Invested**: Money that has been lent out but not yet paid back, WITHOUT interest => `user.corpus_share`
- **Uninvested**: `users.balance`
- **APY**: this needs to take into account that loans have different return aprs and are expected to return different amounts.
  => sum of `loan_requests.loan.terms.corpus_apr` where they lender is not acting as supporter, weighted by `receivables.amount_remain`

thus:weighted sum `loan_participants.percentage` (`loan_participants.loan_amount` as weight)

Other potentially interesing values:

- total amount ever invested: sum of `loan_particpants.loan_amount`
- exptected-return: money that they can expect to come in
  => sum of all `receivables.amount_remain` where the lender is not acting as supporter on the loan in question, weighted by their corpus_share (should be the same as invested \* (1+APY))

### Supporter

the supporter case is special, as the supporter pledges money to a loan-request, but it only gets withdrawn once the
borrower accepts the terms of the loan. Until then the pledged amount can still withdrawn (is in the supporters account).

UX-question how we want to represent that...

#### pre-loan acceptance

- **invested**: TODO1
- **pledged**: money they have agreed to be use in order to support a loan-request (pledgedButNotActive) + that is being used and has not been repaid (pledgedActiveAndNotRepaid)
- **uninvested**: balance - pledgedButnOtActive
- **total assets**: TODO

#### post-loan acceptance

- **invested**: TODO
- **pledged**: TODO
- **uninvested**: TODO
- **total assets**: TODO

reTODO1:

- A) Do we show pledged money as invested?
- B) ame as lender + sum(`receivables.amount_remain`) for all loan-requests they support, respectively weighted by their trust_amount
