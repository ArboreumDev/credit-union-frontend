import { Box, Center, Flex, Text, Stack } from "@chakra-ui/core"

export type Row = {
  key: string
  value: string
  color?: string
}

interface Params {
  rows: Row[]
}

export const Details = ({ rows }: Params) => (
  <Center>
    <Stack>
      {rows.map((row) => (
        <Flex key={row.key}>
          <Box w="200px">
            <Text color="gray.500">{row.key}</Text>
          </Box>
          <Box flex="1">
            <Text color={row.color || "black"} align="right">
              {row.value}
            </Text>
          </Box>
        </Flex>
      ))}
    </Stack>
  </Center>
)
