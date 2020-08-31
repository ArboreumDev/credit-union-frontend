import { Box, Center, Flex, Text, Stack } from "@chakra-ui/core"

interface Params {
  keyValueTuples: [string, string][]
}

export const Details = ({ keyValueTuples }: Params) => (
  <Center>
    <Stack>
      {keyValueTuples.map((tup) => (
        <Flex key={tup[0]}>
          <Box w="200px">
            <Text color="gray.500">{tup[0]}</Text>
          </Box>
          <Box flex="1">
            <Text color="red.500" align="right">
              {tup[1]}
            </Text>
          </Box>
        </Flex>
      ))}
    </Stack>
  </Center>
)
