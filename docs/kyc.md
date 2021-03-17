# 1 Document Upload

Lenders will upload the relevant documents to an s3 bucket. The uploads can be found when logging in to aws-console
under s3/uploads-all-arboreum/<process.ENVIRONMENT>/user_uploads/lenderKYC/<lender-email-address>
and a download-link to the documents is posted to the slack-integrations-channel.

the user then sees a screen that tells them that their application is being reviewed.

# Manual Review

Using the latest insomnia collection please do:

### 1) Penny Drop to bank account

1. select request: `decentro/pennyDrop`
2. fill request with ifsc, account number & unique reference id
3. compare names from result
4. if OK. save screenshot of result (entire screen) to our googledocs folder (google drive /KYC)

### 2) Validate Pan-card

1. select request: `decentro/kyc/public/registry/validate`
2. copy pan number from image into request
3. result should be success
4. if OK. save screenshot of result (entire screen) to our googledocs folder

### 3) Validate Aadhaar card

1. go to uidai site,
2. enter aadhaar card number
3. compare basic dates
4. if OK. save screenshot of result (entire screen) to our googledocs folder

### 4) Register with RC

1. select request: `RC/registration/investor/v1/register`
2. copy data from DB to request

- if success:
  2.1 copy investor_id & escrow_id into the user.table.accout_info.rcAccount to the keys "investorID" & "accountNumber"
- if failure:
  2.2 talk to Julius

# Final approval

If everything is done, go to admin/1290 and click toggle kyc for the user
then send an email to them

```
Congratulations!

Your account has been approved. Go to LINK to log in, deposit funds and start investing.
We look forward to collaborating with you.

Arboreum
```
