import { decentro } from "../common/utils"

describe("Decentro tests", () => {
  test("create account", async () => {
    const res = await decentro.create_virtual_account()
    console.log(res)
  })
})
