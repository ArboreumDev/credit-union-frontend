import Link from "next/link";
import { useSession } from "next-auth/client"
import { SessionUser } from "../utils/interfaces";
import { Card, H4, Button, H5, NumericInput, InputGroup, FormGroup, H1, Checkbox, Radio } from "@blueprintjs/core";
import Axios from "axios";


export default function Onboarding() {
  const [session, loading] = useSession()
  if (loading) return <div>Loading...</div>
  const user = session.user as SessionUser

  const handleSubmit = (event)=>{
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    console.log(data)   
    Axios
      .post('/api/new_user', {data: data})
      .then((res)=> console.log("Done", res.data))
  }

  return (
    <div>
      <H1>Sign up</H1>
      <Card className="profile-card">
        <H4>Hi {user.name}</H4>
        <form onSubmit={handleSubmit} method="post">
          <FormGroup label="Please enter your phone" labelFor="text-input">
            <InputGroup name="phone" />
          </FormGroup>
          <div>
            <H4>Do you plan to lend or borrow?</H4>
            <Radio name="userType" value="Lender" label="Lend" inline checked />
            <Radio name="userType" value="Borrower" label="Borrow" inline />
          </div>
          <Button type="submit" intent="primary">
            Submit
          </Button>{" "}
        </form>
      </Card>
    </div>
  )
}
