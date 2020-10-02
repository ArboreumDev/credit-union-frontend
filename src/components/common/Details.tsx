import { Box, Center, Flex, Text, Stack } from "@chakra-ui/core"

export type KeyValueMap = {
  key: string
  value: any
  color?: string
}

interface Params {
  rows: KeyValueMap[]
}

export const Details = ({ rows }: Params) => (
  <Center>
    <Stack spacing="15px" minW="280px">
      {rows.map((row) => (
        <Flex key={row.key}>
          <Box flex="1">
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
