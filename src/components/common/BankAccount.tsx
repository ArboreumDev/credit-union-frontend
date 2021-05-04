import { Box } from "@chakra-ui/core"
import { Row, Table, TextColumn } from "./Table"
import { BankAccountDetails, BankDetails } from "../../gql/wallet/circle_client"

interface Params {
  //   account: BankAccountDetails
  owner: string
  account: BankDetails
  ownerDescription?: string
  //   availableFunds: number
}

const BankAccount = ({ account, owner, ownerDescription }: Params) => {
  // display all of those fields that are not empty
  const keys = [
    "iban",
    "accountNumber",
    "routingNumber",
    "swiftCode",
    "branchCode",
  ]
  return (
    <Box bg="gray.100">
      <Table>
        <Row key="owner">
          <TextColumn>{ownerDescription || "Owner"}</TextColumn>
          <TextColumn>{owner}</TextColumn>
        </Row>
        {keys
          .filter((k) => account[k])
          .map((k) => (
            <Row key={"bankKey-" + k}>
              <TextColumn>{k}</TextColumn>
              <TextColumn>{account[k]}</TextColumn>
            </Row>
          ))}
      </Table>
    </Box>
  )
}

export default BankAccount
