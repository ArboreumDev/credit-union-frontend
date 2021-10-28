import { Box, Button, Spinner, Input, Select } from "@chakra-ui/core"
import { useCallback, useState, useEffect } from 'react';
// import {executeUSDCDeposit, getDefaultAccountAddr} from "./PaymentsAlgoBuilder"
import { executeUSDCDeposit, getDefaultAccountAddr, optInToAsset, getAllAccountAddr } from "../../../lib/PaymentsBackend"

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
      const allAddresses = await getAllAccountAddr()
      console.log('all add', allAddresses)
      setUserAddresses(allAddresses)
      if (allAddresses.length) {
        setFromAddress(allAddresses[0])
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
