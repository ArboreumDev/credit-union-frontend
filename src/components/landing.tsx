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
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <Center h="40px">
          <img width="150px" src="/images/logo.svg" alt="logo" />
        </Center>
        <Box h="40px">
          <Button
            onClick={() => Router.push("/api/auth/signin")}
            colorScheme="blue"
            variant="outline"
          >
            SignIn
          </Button>
        </Box>
      </VStack>

      <style jsx>
        {`
          .Container {
            // position: relative;
            // min-height: 300px;
            // max-height: 100%;
            // overflow: hidden;
            text-align: center;
            margin: 5em auto;
            padding: 10px;
          }
        `}
      </style>
    </div>
  )
}

export default LandingPage
