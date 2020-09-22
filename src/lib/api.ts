import axios from "axios"

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
