import axios from 'axios'

export const fetcher = (action, payload) => {
  let base_url = process.env.SITE || "";
  let url = base_url + "/api/gql";
  console.log(url);

  return axios
    .post(url, {actionType: action, payload: payload})
    .then(res=> res.data)
    .catch(error => console.log(error))
};
