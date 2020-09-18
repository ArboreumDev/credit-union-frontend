import axios from "axios"
import { LogEventTypes } from "./constant"
import { LogEvent } from "./types"

export const fetcherMutate = (action, payload) => {
  const base_url = process.env.NEXTAUTH_URL || ""
  const url = base_url + "/api/gql"
  console.log(url)

  return axios
    .post(url, { actionType: action, payload: payload })
    .then((res) => res.data)
}

export default async function fetcher(...args: Parameters<typeof fetch>) {
  const response = await fetch(...args)

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line
  const data = await response.json()

  if (response.ok) {
    return data
  }

  const error = new Error(response.statusText)
  console.error(response)
  throw error
}

export async function captureLog(event: LogEvent) {
  fetcher("/api/health/log", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
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

  captureLog({
    eventType: LogEventTypes.ClientError,
    data: errorData,
  })
}
