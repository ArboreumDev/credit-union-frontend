INSERT INTO public."user" (id, created_at, updated_at, name, email, min_interest_rate, max_exposure, user_type, balance, demographic_info, phone, user_number, corpus_share, kyc_approved, roi, account_details) VALUES 
 ('8653118e-7a00-4c4f-be53-0b2e04485db0', '2020-09-01 16:24:32.225944+00', '2020-09-01 16:24:32.225944+00', 'Vishal', 'vishal@arboreum.dev', NULL, NULL, 'lender', 0, '{"father":{"lastName":"fatherLast","firstName":"fatherFirst"},"gender":"MALE","income":"2000000-1000000000","address":"somePlace 3000","zipCode":"40453","aadharPassword":"123"}' , '7342723929', 1, 0, false, '{ "total_apr": { "apr": "0", "interest": { "paid": "0", "remain": "0" }, "principal": { "paid": "0", "remain": "0" } }, "apr_on_pledges": {}, "apr_on_loans": {} }', '{"rcAccount":{"branchCode":"FIXED","investor_id":"","accountNumber":""},"bankDetails":{"bankName":"example","branchCode":"123","accountType":"CURRENT","accountNumber":"1xxx"}}'),
 ('230cff88-a594-4922-90cd-05938de5bdd0', '2020-09-01 18:05:33.10771+00', '2020-09-02 20:38:30.446776+00', 'gp', 'gp@arboreum.dev', NULL, NULL, 'lender', 23000,'{"father":{"lastName":"fatherLast","firstName":"fatherFirst"},"gender":"MALE","income":"2000000-1000000000","address":"somePlace 3000","zipCode":"40453","aadharPassword":"123"}' , '12312', 4, 0, true, '{ "total_apr": { "apr": 0, "interest": { "paid": 0, "remain": 0 }, "principal": { "paid": 0, "remain": 0 } }, "apr_on_pledges": {}, "apr_on_loans": {} }','{"rcAccount":{"branchCode":"FIXED","investor_id":"","accountNumber":""},"bankDetails":{"bankName":"example","branchCode":"123","accountType":"CURRENT","accountNumber":"1xxx"}}'),
 ('130cff88-a594-4922-90cd-05938de5bdd0', '2020-09-01 18:05:33.10771+00', '2020-09-02 20:38:30.446776+00', 'Julius Faber', 'julius@arboreum.dev', NULL, NULL, 'lender', 0,'{"father":{"lastName":"fatherLast","firstName":"fatherFirst"},"gender":"MALE","income":"2000000-1000000000","address":"somePlace 3000","zipCode":"40453","aadharPassword":"123"}' , '1231211', 5, 0, true, '{ "total_apr": { "apr": "0", "interest": { "paid": "0", "remain": "0" }, "principal": { "paid": "0", "remain": "0" } }, "apr_on_pledges": {}, "apr_on_loans": {} }','{"rcAccount":{"branchCode":"FIXED","investor_id":"","accountNumber":""},"bankDetails":{"bankName":"example","branchCode":"123","accountType":"CURRENT","accountNumber":"1xxx"}}'),
  ('8653118e-7a00-4c4f-be53-0b2e04485db1', '2020-09-01 16:24:32.225944+00', '2020-09-01 16:24:32.225944+00', 'Amitabh Bachann', 'amitabh@mail.com', NULL, NULL, 'borrower', 0,'{"father":{"lastName":"fatherLast","firstName":"fatherFirst"},"gender":"MALE","income":"2000000-1000000000","address":"somePlace 3000","zipCode":"40453","aadharPassword":"123"}' , '7342723929', 6, 0, true, '{ "total_apr": { "apr": "0", "interest": { "paid": "0", "remain": "0" }, "principal": { "paid": "0", "remain": "0" } }, "apr_on_pledges": {}, "apr_on_loans": {} }', '{"rcAccount":{"branchCode":"FIXED","investor_id":"","accountNumber":""},"bankDetails":{"bankName":"example","branchCode":"123","accountType":"CURRENT","accountNumber":"1xxx"}}'),
  ('230cff88-a594-4922-90cd-05938de5bdd2', '2020-09-01 18:05:33.10771+00', '2020-09-02 20:38:30.446776+00', 'Deepika Padukone', 'deepika@mail.com', NULL, NULL, 'lender', 30000,'{"father":{"lastName":"fatherLast","firstName":"fatherFirst"},"gender":"MALE","income":"2000000-1000000000","address":"somePlace 3000","zipCode":"40453","aadharPassword":"123"}' , '12312', 7, 0, true, '{ "total_apr": { "apr": "0", "interest": { "paid": "0", "remain": "0" }, "principal": { "paid": "0", "remain": "0" } }, "apr_on_pledges": {}, "apr_on_loans": {} }', '{"rcAccount":{"branchCode":"FIXED","investor_id":"","accountNumber":""},"bankDetails":{"bankName":"example","branchCode":"123","accountType":"CURRENT","accountNumber":"1xxx"}}'),
  ('230cff88-a594-4922-90cd-05938de5bdd5', '2020-09-01 18:05:33.10771+00', '2020-09-02 20:38:30.446776+00', 'Salman Khan', 'salman@mail.com', NULL, NULL, 'lender', 70000,'{"father":{"lastName":"fatherLast","firstName":"fatherFirst"},"gender":"MALE","income":"2000000-1000000000","address":"somePlace 3000","zipCode":"40453","aadharPassword":"123"}' , '12312', 8, 0, true, '{ "total_apr": { "apr": "0", "interest": { "paid": "0", "remain": "0" }, "principal": { "paid": "0", "remain": "0" } }, "apr_on_pledges": {}, "apr_on_loans": {} }', '{"rcAccount":{"branchCode":"FIXED","investor_id":"","accountNumber":""},"bankDetails":{"bankName":"example","branchCode":"123","accountType":"CURRENT","accountNumber":"1xxx"}}');
SELECT pg_catalog.setval('public.user_user_number_seq', 11, true);

-- Add Loan Request for gparuthi@gmail.com
INSERT INTO public.loan_requests (borrower_id, created_at, amount, status, request_id, purpose, risk_calc_result, confirmation_date, payback_status) VALUES 
  ('8653118e-7a00-4c4f-be53-0b2e04485db0', '2020-10-13 01:04:07.2256+00', 90000, 'initiated', '44c6d2cb-062c-4dac-a88f-0df0f32bba96', 'Educational expense', NULL, NULL, NULL),
  ('8653118e-7a00-4c4f-be53-0b2e04485db1', '2020-10-13 01:04:07.2256+00', 90000, 'initiated', '44c6d2cb-062c-4dac-a88f-0df0f32bba91', 'Educational expense', NULL, NULL, NULL);

-- Add Supporter gp@arboreum.dev for loan request
INSERT INTO public.supporters (request_id, supporter_id, pledge_amount, status, invest_in_corpus, participation_request_time, guarantee_division, info) VALUES 
  ('44c6d2cb-062c-4dac-a88f-0df0f32bba96', '230cff88-a594-4922-90cd-05938de5bdd0', 20000, 'unknown', true, '2020-10-13 01:04:37.41869+00', '{}', '{"name": "gp", "email": "gp@arboreum.dev", "amount": "2000", "known_since": "Aug 2011", "supporter_relation": "Manager"}'),
  ('44c6d2cb-062c-4dac-a88f-0df0f32bba91', '230cff88-a594-4922-90cd-05938de5bdd2', 20000, 'unknown', true, '2020-10-13 01:04:37.41869+00', '{}', '{"name": "deepika", "email": "deepika@mail.com", "amount": "2000", "known_since": "Aug 2011", "supporter_relation": "Manager"}');

-- demographic fixture
-- '{"father":{"lastName":"fatherLast","firstName":"fatherFirst"},"gender":"MALE","income":"2000000-1000000000","address":"somePlace 3000","zipCode":"40453","aadharPassword":"123"}'