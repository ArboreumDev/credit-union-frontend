### Borrower

- how to derive upcoming payments and total outstanding debt?
  => as we currently only allow one active loan per borrower, both can be found on the `loan-requests.loan.schedule`

### Lender

Currently shown in the dashboard:

- **total assets**: invested + uninvested
- **Invested**: Money that has been lent out but not yet paid back, (no interest) => `user.corpus_share`
- **Uninvested**: `users.balance`
- **APY**: `user.apy`
  - => source of truth is the corpus_irr, supporter_irr that is saved on the loanSchedule, that will be summed up with a weighted average for all
    loans the user partakes as supporter/lender and then converted to APR. All this will be done by the swarmAI module

Other potentially interesing values:

- total amount ever invested: sum of `loan_particpants.loan_amount`
  TODO
- exptected-return: money that they can expect to come in.
  => invested \* 1 + APY for lenders
  => same plus
- earnings/interest they have already made

### Supporter

- **invested**: `user.corpus_share`
- **pledged**: money they have agreed to be use in order to support a loan-request (pledgedButNotActive) + that is being used and has not been repaid (pledgedActiveAndNotRepaid). Note that this does not include the interest on it.
  - => sum(`supporters.amount_remain`) for all lr where status == (active or initiated) (TODO)
- **uninvested**: balance - pledgedButnOtActive (TODO move pledged but not active to an escrow account of the loan)
- **total assets**: invested + pledged + uninvested
