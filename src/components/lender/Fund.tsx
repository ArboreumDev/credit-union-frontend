import {
  Box,
  Button,
  Center,
  Stack,
  Text,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  Divider,
  useClipboard,
} from "@chakra-ui/core"
import AmountInput from "components/common/AmountInput"
import Address from "components/common/Address"
import BankAccount from "components/common/BankAccount"
import { ChangeBalance } from "lib/gql_api_actions"
import { User } from "lib/types"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { User_Constraint } from "gql/sdk"

type FormData = {
  amount: number
}

interface Props {
  user: User
}

export function AddFundsForm({ user }: Props) {
  const router = useRouter()
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const [nSup, supCount] = useState(1)

  const onSubmit = (formData: FormData) => {
    console.log(formData)
    ChangeBalance.fetch({
      userId: user.id,
      delta: formData.amount,
    })
      .then((res) => {
        router.push("/dashboard")
      })
      .catch((err) => console.error(err))
  }

  return (
    <Box>
      <Text>Choose which method you want to use to fund your account</Text>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                USDC on Ethereum
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box>
              <Text>
                Fund your account by sending ETH into this deposit address
              </Text>
              <Address address={"" + user.account_details.circle.ethAddress} />
              <i>
                Note that we might afterwards move the money out of that account
                to a different address - It will still be reflected in your
                overall account balance though
              </i>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                USDC on Algorand
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              Fund your account by sending ETH into this deposit address
            </Text>
            <Address address={user.account_details.circle.algoAddress} />
            <i>
              Note that we might afterwards move the money out of that account
              to a different address - It will still be reflected in your
              overall account balance though
            </i>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Bank Transfer
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Make a wire-transfer from this account:
            <BankAccount
              account={user.account_details.bankDetails}
              owner={user.name}
            />
            to this bank account:
            <BankAccount
              account={
                user.account_details.circle.wireDepositAccount.bankDetails
              }
              owner={user.account_details.circle.wireDepositAccount.owner}
              ownerDescription="Beneficiary"
            />
            using this <b> {user.account_details.circle.trackingRef}</b> as
            reference code.
            <Box bg="pink.100">
              <p>
                <i>
                  Note: Funds sent from other accounts or without the correct
                  reference code are at risk to be lost or credited incorrectly!
                </i>
              </p>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Stack spacing={3}>
          <Text>How much money would you like to invest?</Text>
          <AmountInput passRef={register({ required: true })} />

          <Box h="10px" />
          <Box padding="20px">
            <ul>
              <li>Your funds will be invested across many loans</li>
              <li>
                At any point in time, you may withdraw un-invested funds from
                your account.
              </li>
            </ul>
          </Box>

          <Box h="30px" />
          <Center>
            <Button disabled type="submit">Submit</Button>
          </Center>
        </Stack>
      </form> */}
    </Box>
  )
}

export default AddFundsForm
