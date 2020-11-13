# Database touchpoints when processing a loan

0. User signs up

   - demographic info is saved in `user`

1. user prepares a loan request

- data on the general request terms is collected from forms and stored put into `loan-requests`
- supporters is saved in `supporters`, with `status=unknown`. The supporters (identified by email), will now see notifications to accept or reject the support request
- the loan-request's status is _initiated_

2. Loan-request is submitted

   - When the user submits the request we use the data from `user`, `loan-requests` and `supporters` (those who have confirmed in the meantime) to compile a LoanRequestMessage to be sent to the swarmai-module
   - the Response including a loanOffer is then saved under in `loan-requests.risk_calc_result` and the status of the request changes to _awaiting_borrower_confirmation_.

3. Borrower accepts the loan

   - A system-snapshot is generated from `users` and sent together with the **LoanOffer** from the `loan-requests.risk_calc_result` field.
   - the response of the ai includes the offered terms and initial state of the loan in an **LoanInfo**-object, which is stored on `loan-requests.loan` and from which all other database-changes will be derived. These are:
     - the status in `loan-request` status is set to _live_
     - balance updates to be made such the borrower is funded from the lenders & supporters. `user.balance`, `user.corpus_share`& `user.apy` (TODO) are updated
     - lenders and the amounts they have contributed are saved in `loan-participants`

4. Borrower repays a loan
   - the ideal amount to be repaid is stored on `loan-requests.loan.schedule`
   - the amount to be repaid (and the loan_id) are send to swarmai, which calculates to whom the money should be redistributed. The returned **SystemUpdate** is then used to update the database as follows
     - the **LoanInfo** object in `loan-requests.loan` is replaced with the one from the **SystemUpdate.loans[loan_id]**
     - **SystemUpdate.accounts** is used to update balances, apy & corpus_share in `users`-table
     - It is also used to update the `supporters.amount_remain` with `SystemUpdate.accounts.PortfolioUpdate.pledgeDelta` (TODO = payment on principal)
     - and `loan_participants.amount_remain` is updated with the repaid principle (TODO)
