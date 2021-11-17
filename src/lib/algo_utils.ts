import {SuggestedParams} from "algosdk/dist/types"
import Link from 'next/link'

/**
 * utility function to wait on a transaction to be confirmed
 * the timeout parameter indicates how many rounds do you wish to check pending transactions for
 */
export async function waitForConfirmation(algodclient, txId, timeout) {
    // Wait until the transaction is confirmed or rejected, or until 'timeout'
    // number of rounds have passed.
    //     Args:
    // txId(str): the transaction to wait for
    // timeout(int): maximum number of rounds to wait
    // Returns:
    // pending transaction information, or throws an error if the transaction
    // is not confirmed or rejected in the next timeout rounds
    if (algodclient == null || txId == null || timeout < 0) {
      throw new Error('Bad arguments.');
    }
    const status = await algodclient.status().do();
    if (typeof status === 'undefined')
      throw new Error('Unable to get node status');
    const startround = status['last-round'] + 1;
    let currentround = startround;
  
    /* eslint-disable no-await-in-loop */
    while (currentround < startround + timeout) {
      const pendingInfo = await algodclient
        .pendingTransactionInformation(txId)
        .do();
      if (pendingInfo !== undefined) {
        if (
          pendingInfo['confirmed-round'] !== null &&
          pendingInfo['confirmed-round'] > 0
        ) {
          // Got the completed Transaction
          return pendingInfo;
        }
  
        if (
          pendingInfo['pool-error'] != null &&
          pendingInfo['pool-error'].length > 0
        ) {
          // If there was a pool error, then the transaction has been rejected!
          throw new Error(
            `Transaction Rejected pool error${pendingInfo['pool-error']}`
          );
        }
      }
      await algodclient.statusAfterBlock(currentround).do();
      currentround += 1;
    }
    /* eslint-enable no-await-in-loop */
    throw new Error(`Transaction not confirmed after ${timeout} rounds!`);
  }


const TESTNET_ALGOD_URL = 'https://api.testnet.algoexplorer.io'
const MAINNET_ALGOD_URL = 'https://api.algoexplorer.io'

const APP_INDEX_TESTNET = parseInt(process.env.PUBLIC_APP_INDEX_TESTNET || '43122678')
const APP_INDEX_MAINNET = parseInt(process.env.PUBLIC_APP_INDEX_MAINNET || '405851709')
export const TESTNET_USDC_ASSET_ID = parseInt(process.env.TESTNET_USDC_ASSET_ID)
export const MAINNET_USDC_ASSET_ID = parseInt(process.env.MAINNET_USDC_ASSET_ID)

export const dummyParams: SuggestedParams = {
  fee: 0,
  firstRound: 0,
  lastRound: 0,
  genesisHash: "",
  genesisID:"" 
}

// type NetName = "TestNet" | "MainNet" | "Local"

const netConfig = (net: string) => {
  console.log('net', net)
  if (net === "MainNet") {
    return {
      appId: APP_INDEX_MAINNET,
      algodAddress: MAINNET_ALGOD_URL,
      usdc_asset_id: MAINNET_USDC_ASSET_ID
    }
  } else  {
    return {
      appId: APP_INDEX_TESTNET,
      algodAddress: TESTNET_ALGOD_URL,
      usdc_asset_id: TESTNET_USDC_ASSET_ID
    }
  } 
}
const ALGORAND_CHAIN = process.env.PUBLIC_APP_ALGORAND_CHAIN

export const algorandConfig = netConfig(ALGORAND_CHAIN)