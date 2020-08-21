import { useSession } from "next-auth/client"
import { User } from "../utils/types"

import { useForm } from "react-hook-form"
import {
  Card,
  H4,
  Button,
  H5,
  NumericInput,
  InputGroup,
  FormGroup,
  H1,
  Checkbox,
  Radio,
} from "@blueprintjs/core"

import { initializeGQL } from "../gql/graphql_client"
import { useRouter } from "next/dist/client/router"
import Dropzone from "../components/Dropzone"
import { getSdk, CreateUserMutationVariables } from "../gql/sdk"
import { fetcher } from "../utils/api"

type FormData = {
  phone: string
  user_type: string
}

export default function Onboarding() {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const router = useRouter()
  const [session, loading] = useSession()
  const gqlClient = initializeGQL()

  const sdk = getSdk(gqlClient)

  if (loading) return <div>Loading...</div>
  const user = session.user as User

  const onSubmit = (data) => {
    const payload: CreateUserMutationVariables = {
      user: {
        name: user.name || data.name,
        email: user.email,
        user_type: data.user_type,
        phone: data.phone,
      },
    }
    // Call mutation
    fetcher("CreateUser", payload)
  }

  return (
    <div>
      <H1>Sign up</H1>
      <Card className="profile-card">
        <H4>Hi {user.name}</H4>
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <FormGroup label="Please enter your name" labelFor="text-input">
            <InputGroup name="name" inputRef={register({ required: true })} />
          </FormGroup>
          <FormGroup label="Please enter your phone" labelFor="text-input">
            <InputGroup name="phone" inputRef={register({ required: true })} />
          </FormGroup>
          <div>
            <H4>Do you plan to lend or borrow?</H4>
            <Radio
              name="user_type"
              value="lender"
              label="Lend"
              inline
              defaultChecked
              inputRef={register({ required: true })}
            />
            <Radio
              name="user_type"
              value="borrower"
              label="Borrow"
              inline
              inputRef={register({ required: true })}
            />
          </div>
          <div>
            <H4>KYC Documents:</H4>
            <Dropzone email={user.email} />
          </div>
          <Button type="submit" intent="primary">
            Submit
          </Button>{" "}
        </form>
      </Card>
    </div>
  )
}
