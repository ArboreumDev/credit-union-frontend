export function Mailto({ email, subject, body, ...props }) {
  return (
    <a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{props.children}</a>
  );
}

export function ContactUs({ subject="", body="", ...props }) {
  return (
    <p>
      <Mailto email="contact@arboreum.dev" subject={subject} body={body}>
        Contact us
      </Mailto>
    </p>
  );
}