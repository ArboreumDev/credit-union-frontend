import { Box, Center, Flex } from "@chakra-ui/core"
import { Currency } from "components/common/Currency"

interface CellProps {
  children?: any
  width?: string
  bg?: string
}

export const Cell = ({ children, width = "100%", bg = "" }: CellProps) => (
  <Center width={width} bg={bg} textAlign="center">
    {children}
  </Center>
)

export const HeaderCell = (props: CellProps) => (
  <Cell {...props} bg="gray.100" />
)

interface AssetProps {
  title: string
  amount: number
  width?: string
}

export const Asset = ({ title, amount, width = "auto" }: AssetProps) => (
  <Flex
    width={width}
    minW={300}
    maxW={400}
    borderWidth={3}
    borderRadius="lg"
    padding={5}
  >
    <Box flex={0.5}>{title}</Box>
    <Box flex={0.5} textAlign="right">
      <Currency amount={amount} />
    </Box>
  </Flex>
)

export const Summary = ({ title, amount, width = "100%" }: AssetProps) => (
  <Flex>
    {/* {title} = <Currency amount={amount} /> */}
    <Box flex={0.7}>{title}</Box>
    <Box flex={0.3} textAlign="right">
      = <Currency amount={amount} />
    </Box>
  </Flex>
)
