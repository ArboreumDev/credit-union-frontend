import { useSession } from "next-auth/client"
import { User } from "../utils/types";

import { useForm } from "react-hook-form"
import { Card, H4, Button, H5, NumericInput, InputGroup, FormGroup, H1, Checkbox, Radio } from "@blueprintjs/core";

import { DbClient } from "../utils/db/DBClient";
import { useRouter } from "next/dist/client/router";

type FormData = {
  phone: string;
  user_type: string
};

export default function Onboarding() {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const router = useRouter()
  const [session, loading] = useSession()
  const dbClient = DbClient.fromEnv()

  if (loading) return <div>Loading...</div>
  const user = session.user as User

  const onSubmit = (data: FormData)=>{
    const variables = { ...data, name: user.name, email: user.email } as User

    // Call mutation
    dbClient.createUser(variables).then((res) => {
      console.log(res)
      // return to home
      router.push("/")
    })
  }

  return (
    <div>
      <H1>Sign up</H1>
      <Card className="profile-card">
        <H4>Hi {user.name}</H4>
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <FormGroup label="Please enter your phone" labelFor="text-input">
            <InputGroup name="phone" inputRef={register({ required: true })} />
          </FormGroup>
          <div>
            <H4>Do you plan to lend or borrow?</H4>
            <Radio name="user_type" value="lender" label="Lend" inline defaultChecked inputRef={register({ required: true })} />
            <Radio name="user_type" value="borrower" label="Borrow" inline inputRef={register({ required: true })} />
          </div>
          <Button type="submit" intent="primary">
            Submit
          </Button>{" "}
        </form>
      </Card>
    </div>
  )
}
