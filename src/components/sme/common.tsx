import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Progress,
  Spinner,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  Wrap,
} from "@chakra-ui/core"

export const HeaderCell = (props: { children: any }) => (
  <Box width="100%" textAlign="center" bg="gray.100">
    {props.children}
  </Box>
)
export const Cell = (props: { children: any }) => (
  <Box width="100%" margin="auto" justifyContent="center" display="flex">
    {props.children}
  </Box>
)
