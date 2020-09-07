import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/core"
import { AiOutlineMail } from "react-icons/ai"

const LoginPage = () => {
  return (
    <Center margin="40px">
      <Container maxW="320px" bg="white">
        <Stack spacing={3}>
          <Center>
            <Box h="40px">
              <img width="150px" src="/images/logo.svg" alt="logo" />
            </Box>
          </Center>
          <Center></Center>
          <InputGroup>
            <InputLeftElement>
              <Text>
                <AiOutlineMail />
              </Text>
            </InputLeftElement>
            <Input type="email" placeholder="email" />
          </InputGroup>
          <Center>
            <Button w="100%">Continue with Email</Button>
          </Center>
          <Divider margin="20px" />
          <Center>
            <Button w="100%">Continue with Google</Button>
          </Center>
        </Stack>
      </Container>
    </Center>
  )
}

export default LoginPage
