import { Box, Text, Flex, ResponsiveValue, Stack } from "@chakra-ui/core"
import { bool } from "aws-sdk/clients/signer"
import * as CSS from "csstype"

export const Row = Flex

interface ColumnProps {
  textAlign?: ResponsiveValue<CSS.Property.TextAlign>
  muted?: bool
  children?: any
}

export const Column = (props: ColumnProps) => {
  const color = props.muted && "gray.500"
  return (
    <Box flex={1} textAlign={props.textAlign} color={color}>
      {props.children}
    </Box>
  )
}

export const TextColumn = (props: ColumnProps) => {
  const color = props.muted && "gray.500"
  return (
    <Column {...props}>
      <Text>{props.children}</Text>
    </Column>
  )
}

export const Table = (props: any) => {
  return (
    <Box>
      <Stack spacing="15px" margin="10px" minW="200px">
        {props.children}
      </Stack>
    </Box>
  )
}
