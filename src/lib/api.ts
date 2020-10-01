import { LogEventTypes } from "./constant"

export async function fetchJSON({
  url,
  payload,
  isSSR,
  isNoParseRes,
}: {
  url: string
  payload: any
  isSSR?: boolean
  isNoParseRes?: boolean
}) {
  if (isSSR) {
    url = (process.env.NEXTAUTH_URL ?? "") + url
  }
  // console.log("fetchJSON", url)

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (isNoParseRes)
    return {
      status: response.status,
    }

  const data = await response.json()

  if (response.ok) {
    return data
  }

  const error = new Error(response.statusText)
  console.error(response)
  throw error
}

export const fetcherMutate = (action, payload) => {
  return fetchJSON({
    url: "/api/gql",
    payload: { actionType: action, payload: payload },
  })
}

export async function captureLog(event) {
  return fetchJSON({ url: "/api/log", payload: event })
}

export async function captureFeedback(message: string) {
  return captureLog({
    eventType: LogEventTypes.ClientFeedback,
    eventData: {
      message: message,
    },
  })
}

// https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror
// TODO hook up to try catch when needed
export async function captureError(ex: any) {
  const errorData = {
    name: ex.name, // e.g. ReferenceError
    message: ex.line, // e.g. x is undefined
    url: document.location.href,
    stack: ex.stack, // stacktrace string; remember, different per-browser!
  }

  return captureLog({
    eventType: LogEventTypes.ClientError,
    eventData: errorData,
  })
}
