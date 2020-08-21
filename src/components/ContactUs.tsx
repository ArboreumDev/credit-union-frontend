export const Mailto = (props: {
  email: string
  subject: string
  body: string
  children?: any
}) => {
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

export function Contactus(subject = "", body = "", text = "Contact Us") {
  return (
    <Mailto email="contact@arboreum.dev" subject={subject} body={body}>
      {text}
    </Mailto>
  )
}
