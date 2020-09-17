import { Box, Container, Heading, Stack } from "@chakra-ui/core"

const SurgeApplication = () => (
  <Container>
    <Stack spacing="6">
      <Heading size="2xl">Surge Application</Heading>
      <Stack>
        <Heading size="lg">What is Arboreum?</Heading>
      </Stack>
      <Stack>
        <Heading size="lg">Product Demo</Heading>
        <Heading size="md">Borrower Journey</Heading>
        <div className="vid">
          <iframe
            src="https://www.loom.com/embed/2f8d3aa2aba6402697939b3f62032393"
            frameBorder="0"
            allowFullScreen
            className="vidFrame"
          ></iframe>
        </div>
      </Stack>
      <Stack>
        <Heading size="md">Lender Journey</Heading>
        <div className="vid">
          <iframe
            src="https://www.loom.com/embed/c4b03d2aaeb547bfa21adae68f957c02"
            frameBorder="0"
            allowFullScreen
            className="vidFrame"
          ></iframe>
        </div>
      </Stack>
      <Stack>
        <Heading size="md">Backend</Heading>
        <div className="vid">
          <iframe
            src="https://www.loom.com/embed/c4b03d2aaeb547bfa21adae68f957c02"
            frameBorder="0"
            allowFullScreen
            className="vidFrame"
          ></iframe>
        </div>
      </Stack>
    </Stack>
    <style jsx>
      {`
        .vid {
          position: relative;
          padding-bottom: 86.74698795180724%;
          height: 0;
        }
        .vidFrame {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}
    </style>
  </Container>
)

export default SurgeApplication
