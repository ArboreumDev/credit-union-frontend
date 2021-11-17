import { 
  Box, Button, Spinner, Input, Select, Modal,   ModalOverlay,  useDisclosure,
  ModalContent,   ModalHeader,   ModalFooter,   ModalBody,   ModalCloseButton, 
  useToast,
} from "@chakra-ui/core"
import { useCallback, useState, useEffect } from 'react';
// import {executeUSDCDeposit, getDefaultAccountAddr} from "./PaymentsAlgoBuilder"
import { executeUSDCDeposit} from "../../../lib/PaymentsBackend"
import {Accounts} from "lib/algo_types";
import MyAlgoConnect from '@randlabs/myalgo-connect'; 
// import dynamic from 'next/dynamic'
import algosdk from "algosdk";  
import Address from "./Address"
import {SuggestedParams} from "algosdk/dist/types"
import {algorandConfig, dummyParams, waitForConfirmation} from "lib/algo_utils";
// import {algoTxClient} from "../../../gql/algo_client"

interface DepositAlgoConnectProps {
    toAddress: string
}

/*
 * Modal to TODO
 * @param toAddress target address where usdc should be sent
 */
export const DepositWithAlgoConnect = ({ toAddress }: DepositAlgoConnectProps) => {
  const [fromAccount, setFromAccount] = useState({name: "", address: ""});
  const [params, setParams] = useState(dummyParams);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);

  const toast = useToast()

  // const [fromAddress, setFromAddress] = useState('');
  // const [userAddresses, setUserAddresses] = useState([]);
  // const { hasCopied, onCopy } = useClipboard(account.algorand?.optedIn || "no address linked")
   
  useEffect(()=>{
    console.log('effect done')
  }, [])

  const connect = async () => {
    const algoConnect = new MyAlgoConnect()
    try {
      const accounts = await algoConnect.connect({ shouldSelectOneAccount: false });
      if (accounts.length > 0) {
        setFromAccount(accounts[0])
        await fetchTxParams()
      } else {
        console.log('whoops?')
      }
      
    } catch (err) {
      console.log('err')
      console.error(err);
    }
  }
  
  const fetchTxParams = async () => {
    const algodClient = new algosdk.Algodv2("", algorandConfig.algodAddress, '');
    const params = await algodClient.getTransactionParams().do();
    setParams(params)
  }

  const executeTx = useCallback(async () => {
    console.log('trying to send create, sign and send deposit tx')
    setIsDepositing(true)
    const algodClient = new algosdk.Algodv2("", algorandConfig.algodAddress, '');
    const myAlgoConnect = new MyAlgoConnect();

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        suggestedParams: {
            ...params,
        },
        from: fromAccount.address,
        to: toAddress,
        assetIndex: algorandConfig.usdc_asset_id,
        amount: amount,
        // note:  // TODO figure out how to pass note
    });
    
    const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
    try {
        const {txId} = await algodClient.sendRawTransaction(signedTxn.blob).do();
        const txResponse = await waitForConfirmation(algodClient, txId, 10)
        console.log('res', txResponse)
        if (txResponse['confirmed-round']) {
            setIsDepositing(false)
            // TODO use success-components from tusker-pilot
            toast({
                title: "Success! Your deposit has been made.",
                description: "Note that it can take a bit until it will be available to lend out.",
                status: "success",
                duration: 10000,
                isClosable: true,
            })
        }
    } catch (err) {
        console.log('err', err)
        setIsDepositing(false)
        toast({
            title: "Failure! Could not send signed transaction.",
            description: "Please contact support",
            status: "error",
            duration: 10000,
            isClosable: true,
        })
    }
  }, [amount]);


  return (
    <>
      <Button onClick={onOpen}>Deposit from myAlgoWallet</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deposit USDC</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!fromAccount.address ? 
              <Button onClick={connect}>Connect myAlgoWallet</Button>
              : (
                <>
                  <Input
                    type="number"
                    placeholder={`<enter deposit amount>`}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                  />
                  <Button
                    colorScheme="teal"
                    disabled={amount <=0 }
                    onClick={executeTx}
                  >
                    {loading ?  <Spinner /> : (
                      "Complete Deposit"
                    )}
                  </Button>
                </>
              )
            }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

interface Props {
    buttonText: string,
    // amount: number,
    toAddress: string
}

/*
 * Widget to trigger a purchase on click. Consists of a Button, Loading State
 * and a text prop to show below button (where text is the transaction response)
 * @param buttonText text to display on button
 * @param amount amount(of ticket) in ALGOs to charge user
 */
export const DepositWidget = ({ buttonText, toAddress }: Props) => {
  const [result, setResult] = useState('');
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fromAddress, setFromAddress] = useState('');
  const [userAddresses, setUserAddresses] = useState([]);

  useEffect( () => {
    // this will also connect the AlgoSigner (grant our app access)
    const loadAddresses = async () => {
      const algoConnect = new MyAlgoConnect()
      try {
        const accounts = await algoConnect.connect({ shouldSelectOneAccount: false });
        if (accounts.length > 0) {
            console.log('yes', accounts)
            setUserAddresses(accounts)
            console.log('acc0', accounts[0])
            setFromAccount(accounts[0])
            setFromAddress(accounts[0].address)
          } else {
            console.log('no', accounts)
          }
          console.log('acc is', accounts, accounts.length > 0)
      
      } catch (err) {
        console.log('err')
        console.error(err);
      }
    }
    loadAddresses()
  }, [])



  const executeTx = useCallback(async () => {
    if (fromAddress) {
      setResult('processing...');
      const response = await executeUSDCDeposit(fromAddress, toAddress, amount)
      // const response = await optInToAsset(fromAddress, USDC_ASSET)
      console.log('resp', response)

      // const response = await executeUSDCDeposit( fromAddress, toAddress, amount, setLoading);
      if (response.status) {
        setResult(`Success: see your tx here: https://testnet.algoexplorer.io/tx/${response.txId}. Please note that it will
        take some time until we show the deposit as available in your balance`)

      }

    } else {
      setResult('No accounts found in wallet');
    }
    setLoading(false);
  }, [amount]);

  // TODO the result of the transaction needs to be displayed in a better way: toast, banner under the top bar, ...
  return (
    <div>
      <Select 
        width="300px"
        value={fromAddress} 
        onChange={(e)=> {setFromAddress(e.target.value)}}
        placeholder={"select account"}>
          {userAddresses.map((s) => (
              <option key={s} value={s}> {s} </option>
          ))}
      </Select>
 
      {fromAddress && (
        <Input
          type="number"
          placeholder={`<enter deposit amount>`}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      )}
      <Button
        // variant="contained"
        // color="teal"
        disabled={amount <=0 }
        onClick={executeTx}
      >
        {loading ?  <Spinner /> : (
          buttonText
        )}
      </Button>
      <Box>
        <i>{result}</i>
      </Box>
    </div>
  );
};
