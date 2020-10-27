import { Link } from "@chakra-ui/core"

interface Props {
  email: string
  body: string
  subject: string
  children?: any
}
export const Mailto = (props: Props) => {
  return (
    <Link
      color="teal.500"
      href={`mailto:${props.email}?subject=${
        encodeURIComponent(props.subject) || ""
      }&body=${encodeURIComponent(props.body) || ""}`}
    >
      {props.children}
    </Link>
  )
}

interface ContactProps {
  subject?: string
  body?: string
  text?: string
}

export default function Contactus({
  subject = "",
  body = "",
  text = "Contact Us",
}: ContactProps) {
  return (
    <Mailto email="contact@mail.dev" subject={subject} body={body}>
      {text}
    </Mailto>
  )
}
