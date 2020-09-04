import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/core"
import { useState } from "react"
import { Fixtures } from "../../utils/demo/fixtures"
import { getUIStateComponentMap } from "../../pages/index"

interface Props {
  demoTitle: string
  user: typeof Fixtures.Borrower
  journeySequence: any
}
export const DemoView = ({ demoTitle, user, journeySequence }: Props) => {
  const componentMap = getUIStateComponentMap(user)
  const [stateIdx, setStateIdx] = useState(0)
  const [state, componentTitle] = Object.entries(journeySequence)[stateIdx]
  const component = componentMap[state]

  return (
    <Box>
      <Center>
        <Button
          disabled={stateIdx === 0}
          onClick={() => setStateIdx(stateIdx - 1)}
        >
          &lt;{" "}
        </Button>
        <Box w="200px" marginBottom="20px">
          <Slider
            onChange={(v) => setStateIdx(v)}
            max={Object.keys(journeySequence).length - 1}
            step={1}
            value={stateIdx}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        <Button
          disabled={stateIdx === Object.keys(journeySequence).length - 1}
          onClick={() => setStateIdx(stateIdx + 1)}
        >
          &gt;{" "}
        </Button>
      </Center>
      <Center>
        <Heading as="h1" size="md">
          {demoTitle} | {stateIdx + 1}
        </Heading>
      </Center>
      <Center marginBottom="20px">{componentTitle}</Center>
      <Divider marginBottom="20px"></Divider>
      {component}
    </Box>
  )
}
