import {
  Box,
  useToast,
  Button,
  Select,
  HStack,
  Text,
  Spinner,
  Stack,
  Tooltip,
  useClipboard,
} from "@chakra-ui/core"
import { useCallback, useState, useEffect } from 'react';
import { optInToProfileContract, getAllAccountAddr } from "../../../lib/PaymentsBackend"
import { LinkAlgoAccount } from "lib/gql_api_actions"
import { AccountDetails } from "lib/types"
import {algorandConfig, dummyParams} from "lib/algo_utils";
import {Accounts} from "lib/algo_types";
import MyAlgoConnect from '@randlabs/myalgo-connect'; 
// import dynamic from 'next/dynamic'
import algosdk from "algosdk";  
import Address from "./Address"
import {SuggestedParams} from "algosdk/dist/types"



declare const AlgoSigner: any;

interface Props {
    // the account_details object from the user-table
    account: AccountDetails
    // amount: number,
    // toAddress: string
}

/*
 * Widget to trigger a purchase on click. Consists of a Button, Loading State
 * and a text prop to show below button (where text is the transaction response)
 * @param buttonText text to display on button
 * @param amount amount(of ticket) in ALGOs to charge user
 */
export const AlgoProfile = ({ account }: Props) => {
  const [result, setResult] = useState('')
  const [algoSignerInstalled, setAlgoSignerInstalled] = useState(false)
  const [fromAddress, setFromAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [fromAccount, setFromAccount] = useState({name: "", address: ""});
  const [isOptedIn, setIsOptedIn] = useState(account.algorand?.optedIn ? true : false );
  const [params, setParams] = useState(dummyParams);

  const { hasCopied, onCopy } = useClipboard(account.algorand?.optedIn || "no address linked")

  const toast = useToast()

    useEffect( () => {
        const checkOptInStatus = async () => {
        // const algodClient = new algosdk.Algodv2("", config.algodAddress, '');
        // attempt to connect to purestake
        const algodClient = new algosdk.Algodv2("", algorandConfig.algodAddress, '');
        const accountInfo = await algodClient.accountInformation(fromAccount.address).do();
        console.log(accountInfo)
        if (accountInfo['apps-local-state'].filter((a: any) => a.id == algorandConfig.appId).length > 0) {
            console.log('is opted in')
            setIsOptedIn(true)
            await LinkAlgoAccount.fetch({ address: fromAccount.address, name: fromAccount.name })
        } else {
            setIsOptedIn(false)
        }
        const params = await algodClient.getTransactionParams().do();
        setParams(params)
        }
        if (fromAccount.address) {
            checkOptInStatus()
        }
    }, [fromAccount, fromAddress, userAddresses])


  /**
   * load addresses from AlgoSigner so that user can choose which one to link to their account
   */
  const connect = async () => {
    const algodClient = new algosdk.Algodv2("", algorandConfig.algodAddress, '');
    const algoConnect = new MyAlgoConnect()
    try {
      const accounts = await algoConnect.connect({ shouldSelectOneAccount: false });
      if (accounts.length > 0) {
          setUserAddresses(accounts)
          setFromAccount(accounts[0])
          setFromAddress(accounts[0].address)
        }
    } catch (err) {
      console.error(err);
    }
  }

  const linkAccount = async () => {
      const status = false
    //   const status = await optInToProfileContract(fromAddress)
      if (status) {
        const res = await LinkAlgoAccount.fetch({ address: fromAccount.address, name: fromAccount.name })
        setIsConnecting(false)
        toast({
          title: "Success! Your account is linked.",
          description: "Note that it can take a few seconds until the change will be displayed.",
          status: "success",
          duration: 10000,
          isClosable: true,
        })
        console.log('resLink', res)
    }
  }

  return (
    <div>
        <Stack direction="column">

            <HStack>
                <Text> Algorand Address: </Text>
                { account.algorand?.optedIn ? 
                    <Address 
                    address={account.algorand.optedIn.address}
                    size="short"
                    name={account.algorand.optedIn.name}
                    />
                    : <p> Not Connected </p>
                }
            </HStack>
            { !account.algorand?.optedIn && (
                    <>
                    {userAddresses.length === 0 && (
                        <Button width="250px" onClick={connect}>
                            Connect AlgorandWallet
                        </Button>
                    )}
                    {userAddresses.length > 0 && (
                        <>
                        <Stack direction="row">
                            <Select 
                                width="250px"
                                value={fromAddress} 
                                onChange={(e)=> {setFromAddress(e.target.value)}}
                                placeholder={"select account"}
                            >
                                {userAddresses.map((a: Accounts) => (
                                    <option key={a.address} value={a.address}> {a.name}: ({a.address})  </option>
                                ))}
                            </Select>
                            <Button width="50px" onClick={connect}>Reload</Button>
                        </Stack>
                        <Button width="300px" onClick={linkAccount}>
                            {isConnecting 
                                ? <Spinner /> 
                                : <Tooltip label="This will create and ask you to sign a transaction that opts you into our Algorand Credit-Score Application.">
                                    Link Address to Credit Profile
                                </Tooltip>
                            }
                        </Button>
                        </>
                )}
                </>
            )}
        </Stack>
    </div>
  )

}

export default AlgoProfile