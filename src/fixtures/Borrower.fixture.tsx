import { bJourneySequence } from "pages/demo/[userType]/[jstep]"

let components = {}
bJourneySequence.map((j) => {
  components[j.title] = j.component
})
export default components
