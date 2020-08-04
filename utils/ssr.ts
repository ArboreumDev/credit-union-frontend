import { initializeGQL } from "./graphql_client";

export const fetcher = (q) => {
  let base_url = process.env.SITE || "";
  let url = base_url + "/api/gql";
  console.log(url);

  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      query: q,
    }),
  }).then((r) => r.json());
};