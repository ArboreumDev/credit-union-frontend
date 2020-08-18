import axios from 'axios'

export const fetcher = (q) => {
  let base_url = process.env.SITE || "";
  let url = base_url + "/api/gql";
  console.log(url);

  return axios
    .post(url, {query: q})
    .then(res=> res.data)
    .catch(error => console.log(error))
};
