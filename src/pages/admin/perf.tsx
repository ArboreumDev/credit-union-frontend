import { Button } from "@chakra-ui/react"

async function measureFunction() {
  async function once() {
    const t0 = performance.now()

    const d = await fetch("/api/auth/session")
    const data = await d.json()
    console.log(data)

    const t1 = performance.now()
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    return t1 - t0
  }
  const allTimes: number[] = []
  for (let i = 0; i < 10; i++) {
    const t = await once()
    allTimes.push(t)
    const sum = allTimes.reduce((previous, current) => (current += previous))
    const avg = sum / allTimes.length
    console.log("Average time = ", avg)
  }
}

export default function Perf() {
  return <Button onClick={() => measureFunction()}>Start</Button>
}
