import { Box, Spinner, Stack, Text } from "@chakra-ui/core"
import { useState } from "react"
import Veriff from '@veriff/js-sdk'

interface FileStatus {
  [f: string]: {
    done: boolean
  }
}

interface Props {
  email: string
}
export function VeriffKYC({ email }: Props) {


    // {
    //     "status": "success",
    //     "verification": {
    //         "id": "UUID V4 Identifying the verification",
    //         "url": "full url to which a person should be redirected in order to proceed with verification flow",
    //         "host": "hostname",
    //         "status": "status of the verification",
    //         "sessionToken": "JWT encoded verification token"
    //     }
    // }
  

    return (
        <Box>
            <Text>TODO</Text>
        </Box>
    )
}


export default VeriffKYC

