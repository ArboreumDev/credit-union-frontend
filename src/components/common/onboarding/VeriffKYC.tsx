import { Link, Box, Spinner, Stack, Text, Button } from "@chakra-ui/core"
import { useState } from "react"
import Veriff from '@veriff/js-sdk'
import { ExternalLinkIcon } from '@chakra-ui/icons'

interface FileStatus {
  [f: string]: {
    done: boolean
  }
}

interface Props {
  email: string
}
export function VeriffKYC({ email }: Props) {
    const [status, setStatus] = useState('unverified')
    const [link, setLink] = useState('')

    const getVerified = () => {
        const veriff = Veriff({
            // OR does this need to what is described as API-SECRET?
            apiKey: 'e8560157-1ed8-4278-a36d-68badbb417f1',
            parentId: 'veriff-root',
            onSession: function(err, response) {
              // response will look like this:
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
              if (!err) {
                // received the response, verification can be started now
                console.log(response)
                setStatus(response.status)
                setLink(response.verification.url)
                // TODO save session Token on user
                // TODO set callback URL where user will be redirected to in veriff-station dashboard
              }
            }
          });
        
          veriff.mount();
        
    }


    return (
        <Box>
            <Text>Your KYC Status: {status}</Text>
            {status !== 'success' ? 
                <Button onClick={getVerified}> Get Verified </Button>
                : (<>
                    <Link href={link} isExternal>
                        Proceed with Veriff, our external KYC Provider <ExternalLinkIcon mx='2px' />
                    </Link>
                </>)
            }
        </Box>
    )
}


export default VeriffKYC

