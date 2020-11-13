import { LogEventTypes } from "./constant"

function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&")
}
function generateErrorResponse(message, data: any) {
  return {
    status: "error",
    message,
    data,
  }
}

interface FetchParams {
  url: string
  params: any
  headers: any
  method: string
}

export class Fetcher {
  headers: any

  constructor(headers?: any, private baseURL?: string) {
    this.headers = headers ?? {
      "Content-Type": "application/json",
    }
  }

  static _fetch = async ({ url, params, headers, method }: FetchParams) => {
    const options: RequestInit = {
      method,
      headers,
    }
    if (params) {
      if (method === "GET") {
        url += "?" + objectToQueryString(params)
      } else {
        options.body = JSON.stringify(params)
      }
    }

    const response = await fetch(url, options)

    let data = null
    try {
      data = await response.json()
    } catch (error) {
      data = null
    }

    if (![200, 201].includes(response.status)) {
      throw generateErrorResponse(
        "The server responded with an unexpected status.",
        data
      )
    }

    return data
  }

  fetch(url, params, method = "GET") {
    if (this.baseURL) url = this.baseURL + url
    return Fetcher._fetch({ url, params, headers: this.headers, method })
  }

  get(url, params) {
    return this.fetch(url, params)
  }

  post(url, params) {
    return this.fetch(url, params, "POST")
  }

  update(url, params) {
    return this.fetch(url, params, "PUT")
  }

  remove(url, params) {
    return this.fetch(url, params, "DELETE")
  }
}

export async function fetchJSON({
  url,
  payload,
}: {
  url: string
  payload: any
}) {
  const fetcher = new Fetcher()

  return await fetcher.post(url, payload)
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
