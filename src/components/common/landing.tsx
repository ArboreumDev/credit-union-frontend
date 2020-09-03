import axios from "axios"
import { Fragment } from "react"
import {
  Button,
  ButtonGroup,
  Stack,
  VStack,
  StackDivider,
  Box,
  Center,
} from "@chakra-ui/core"
import { FiLogIn } from "react-icons/fi"
import Router from "next/router"

const LandingPage = () => {
  return (
    <div className="Container">
      <VStack spacing={4} align="stretch">
        <Center margin="40px" h="40px">
          <img width="150px" src="/images/logo.svg" alt="logo" />
        </Center>
        <Center h="40px">
          <Button
            onClick={() => Router.push("/api/auth/signin")}
            colorScheme="blue"
            variant="outline"
          >
            Sign In
          </Button>
        </Center>
      </VStack>
    </div>
  )
}

export default LandingPage
