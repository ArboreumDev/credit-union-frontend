import React from "react"
import {
  ThemeProvider,
  CSSReset,
  theme,
  Heading,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
  Container,
} from "@chakra-ui/core"

const Page = () => (
  <Container>
    <Heading>Deposit Funds</Heading>
    <Stack minWidth="sm" maxWidth="lg">
      <Box>
        <FormControl>
          <FormLabel>Deposit Amount</FormLabel>
          <Input />
          <FormErrorMessage>Error message</FormErrorMessage>
        </FormControl>
      </Box>
      <Text>
        The amount will be invested in several loans. Funds once invested,
        cannot be withdrawn before payback is complete.
      </Text>
      <Text>
        An any point in time, you may withdraw un-invested funds from your
        account.
      </Text>
    </Stack>
  </Container>
)

export default Page
