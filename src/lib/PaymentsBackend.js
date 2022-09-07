// injected via extension:
/* global AlgoSigner */
// use this if needed in a typescript file:
// declare const AlgoSigner
import {algoTxClient} from "../gql/algo_client"
// const CHAIN_NAME = process.env.ALGORAND_CHAIN
// const CHAIN_NAME = "TestNet"
const CHAIN_NAME = "local"
// const USDC_ASSET_ID = 105 //process.env.USDC_ASSET_ID
export const USDC_ASSET_ID = parseInt(process.env.USDC_ASSET_ID)
const CONFIRMED_ROUND = 'confirmed-round';


/**
 * Get default account address from user's wallet. Returns undefined otherwise.
 * NOTE: Currently this returns the first address from list of account addresses
 *
 * TODO: Update this function to return "current active" account in wallet after
 * https://github.com/PureStake/algosigner/issues/252 is resolved.
 * Task - https://www.pivotaltracker.com/story/show/178760753
 */
export async function getDefaultAccountAddr() {
  await AlgoSigner.connect()
  const walletAccounts =
    (await AlgoSigner.accounts({
      ledger: CHAIN_NAME,
    })) ?? [];

  console.log('acc', walletAccounts)

  if (walletAccounts.length) {
    return walletAccounts[0].address;
  }
  return undefined;
}

export async function getAllAccountAddr() {
  await AlgoSigner.connect()
  const walletAccounts =
    (await AlgoSigner.accounts({
      ledger: CHAIN_NAME,
    })) ?? [];
  return walletAccounts.map(a => a.address)
}


// =========== tx building & execution with backend & pure AlgoSigner ================
// TODO implement all this in typescript!
const sendSignedTx = async (signedTx, ledgerName = CHAIN_NAME) => {
  const {txId} = await AlgoSigner.send({ledger: ledgerName, tx: signedTx.blob})
  return {txId: txId, status: txId ? true: false}
}

 export async function executeUSDCDeposit(fromAddress, toAddress, amount) {
   // TODO throw good errors
  const unsignedTx = await algoTxClient.getUSDCDepositTx(fromAddress, toAddress, amount)
  const signedTxs = await AlgoSigner.signTxn([{txn: unsignedTx.blob}])
  return sendSignedTx(signedTxs[0])
}


export async function optInToAsset(fromAddress, assetId) { 
  if (await algoTxClient.isOptedInToAsset(fromAddress, assetId)) {
    console.log('is already opted in')
    return true
  } else {
    // NOTE: assuming client is already connected / access granted
    const unsignedTx = await algoTxClient.getAssetOptInTx(assetId, fromAddress)
    const signedTxs = await AlgoSigner.signTxn([{txn: unsignedTx.blob}])
    return sendSignedTx(signedTxs[0])
  }
}

export async function optInToProfileContract(fromAddress) { 
  if (await algoTxClient.isOptedInToProfileApp(fromAddress)) {
    console.log('is already opted in')
    return true
  } else {
    const unsignedTx = await algoTxClient.getCreditProfileOptInTx(fromAddress)
    const signedTxs = await AlgoSigner.signTxn([{txn: unsignedTx.blob}])
    return sendSignedTx(signedTxs[0])
  }
}



// =========== tx building & execution with algobuilder/web ================
// copied from `algob unbox-template shop`
// import { types, WebMode } from '@algo-builder/web';
// /**
//  * Executes transaction to receive payment of ticket
//  * @param fromAddress address of currently active account in wallet
//  * @param toAddress address to recieve payment (currently set to master-account)
//  * @param amount amount (in ALGOs)
//  * @param setLoading setLoading function to set loading state in button
//  * @returns response of transaction OR rejection message
//  */
// //  async function executePayment(fromAddress: string, toAddress: string, amount: number, setLoading: boolean) {
//  export async function executeUSDCDeposit(fromAddress, toAddress, amount, setLoading) {
//     try {
//       const web = new WebMode(AlgoSigner, CHAIN_NAME);
//       // const txParams = getUSDCTransferParams(fromAddress, toAddress, amount);
//       const txParams = getAlgoTransferParams(fromAddress, toAddress, 0);
//       // show loading state on button while we send & wait for transaction response
//       setLoading(true);
//       let response = await web.executeTransaction(txParams);
//       console.log(response);
//       const confirmedTxInfo = {
//         txId: response.txId,
//         type: 'pay',
//         amount: amount,
//         confirmedRound: response[CONFIRMED_ROUND],
//       };
  
//       return [
//         <pre key={''}>
//           {'Successfully bought ticket: ' +
//             '\n' +
//             JSON.stringify(confirmedTxInfo, null, 2)}
//         </pre>,
//       ];
//     } catch (error) {
//       console.error(error);
//       return ['Error Occurred: ' + error.message];
//     }
//     return "1"
//   }

  
// export async function optInToAsset(fromAddress, assetId) { }


// export async function optInToSmartContract() { }


// const getUSDCTransferParams = (fromAddress, toAddress, amount) => {
//       return {
//         type: types.TransactionType.TransferAsset,
//         sign: types.SignType.SecretKey,
//         fromAccountAddr: fromAddress,
//         toAccountAddr: toAddress,
//         assetID: USDC_ASSET_ID,
//         amount: amount,
//         payFlags: {totalFee: 1000, note: "LenderDeposit"},
//       };
// }

// const getAlgoTransferParams = (fromAddress, toAddress, amount) => {
//       return {
//         type: types.TransactionType.TransferAlgo,
//         sign: types.SignType.SecretKey,
//         fromAccountAddr: fromAddress,
//         toAccountAddr: toAddress,
//         amount: amount,
//         amountMicroAlgos: 0 ,
//         payFlags: {},
//       };
