import { Box, Center, Flex } from "@chakra-ui/core"

interface CellProps {
  children?: any
  width?: string
  bg?: string
}

export const Cell = ({ children, width = "100%", bg = "" }: CellProps) => (
  <Center width={width} bg={bg}>
    {children}
  </Center>
)

export const HeaderCell = (props: CellProps) => (
  <Cell {...props} bg="gray.100" />
)
