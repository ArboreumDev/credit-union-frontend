import { accountErrors } from "@algo-builder/web/build/errors/errors-list";
import {
  Box,
  Button,
  Select,
  Divider,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
  Spinner,
  Center,
  AlertIcon,
  AlertTitle,
  Flex,
  Progress,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Tooltip,
  Wrap,
} from "@chakra-ui/core"
import { useCallback, useState, useEffect } from 'react';
import { optInToProfileContract, getAllAccountAddr } from "../../../lib/PaymentsBackend"
import { LinkAlgoAccount } from "lib/gql_api_actions"
import { AccountDetails } from "lib/types"

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
  const [userAddresses, setUserAddresses] = useState([]);

  useEffect( () => {
    if (typeof AlgoSigner !== 'undefined') {
        setAlgoSignerInstalled(true)
    }
  }, [])


  /**
   * load addresses from AlgoSigner so that user can choose which one to link to their account
   */
  const connect = async () => {
    const allAddresses = await getAllAccountAddr()
    console.log('all add', allAddresses)
    setUserAddresses(allAddresses)
    if (allAddresses.length) {
    setFromAddress(allAddresses[0])
    }
  }

  const linkAccount = async () => {
      const {status} = await optInToProfileContract(fromAddress)
      if (status) {
        const res = await LinkAlgoAccount.fetch({ address: fromAddress })
        console.log('resLink', res)
    }
  }

  return (
    <div>
        <Stack direction="column">

            <Text>Algorand Address: {account.algorand?.address || "Not connected"} </Text>
            { !account.algorand?.address && (
                <>
                {!algoSignerInstalled && (
                    <Box backgroundColor="red.100">
                        You need to install the AlgoSigner extension to connect your algorand account. Unfortunately, 
                        It is currenlty only available on the chrome browser.
                    </Box>
                )}
                {algoSignerInstalled && (
                    <>
                    {userAddresses.length === 0 && (
                        <Button width="250px" onClick={connect}>
                            Connect AlgoSigner
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
                                {userAddresses.map((s) => (
                                    <option key={s} value={s}> {s} </option>
                                ))}
                            </Select>
                            <Button width="50px" onClick={connect}>Reload</Button>
                        </Stack>
                        <Button width="300px" onClick={linkAccount}>
                            <Tooltip label="This will create and ask you to sign a transaction that opts you into our Algorand Credit-Score Application.">
                                Link Address to Credit Profile
                            </Tooltip>
                        </Button>
                        </>
                    )}
                    </>
                )}
                </>
            )}
        </Stack>
    </div>
  )

}

export default AlgoProfile