import axios from "axios"

export const fetcher = (action, payload = {}) => {
  const base_url = process.env.NEXTAUTH_URL || ""
  const url = base_url + "/api/gql"
  console.log(url)

  return axios
    .post(url, { actionType: action, payload: payload })
    .then((res) => res.data)
}
