interface Props {
  email: string
  body: string
  subject: string
  children?: any
}
export const Mailto = (props: Props) => {
  return (
    <a
      href={`mailto:${props.email}?subject=${
        encodeURIComponent(props.subject) || ""
      }&body=${encodeURIComponent(props.body) || ""}`}
    >
      {props.children}
    </a>
  )
}

interface ContactProps {
  subject: string
  body: string
  text: string
}

export const Contactus = ({
  subject = "",
  body = "",
  text = "Contact Us",
}: ContactProps) => {
  return (
    <Mailto email="contact@arboreum.dev" subject={subject} body={body}>
      {text}
    </Mailto>
  )
}
