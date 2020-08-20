export function Mailto({ email, subject, body, ...props }) {
  return (
    <a
      href={`mailto:${email}?subject=${
        encodeURIComponent(subject) || ""
      }&body=${encodeURIComponent(body) || ""}`}
    >
      {props.children}
    </a>
  );
}

export function Contactus({
  subject = "",
  body = "",
  text = "Contact Us",
  ...props
}) {
  return (
    <Mailto email="contact@arboreum.dev" subject={subject} body={body}>
      {text}
    </Mailto>
  );
}
