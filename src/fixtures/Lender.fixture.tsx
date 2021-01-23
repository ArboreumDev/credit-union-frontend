import { lJourneySequence } from "pages/demo/[userType]/[jstep]"

let components = {}
lJourneySequence.map((j) => {
  components[j.title] = j.component
})
export default components
