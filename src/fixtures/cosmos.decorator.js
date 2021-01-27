import { ChakraProvider } from "@chakra-ui/core"

export default ({ children }) => (
  <ChakraProvider resetCSS>{children}</ChakraProvider>
)
