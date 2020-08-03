import { initializeGQL } from "../utils/graphql_client";

global.fetch = require("node-fetch");
require("dotenv").config();
console.log(process.env.HASURA_ADMIN_SECRET);

const API_URL = "https://right-thrush-43.hasura.app/v1/graphql";

test('user query', async () => {
  let gqlClient = initializeGQL()

  const query = /* GraphQL */ `
    query MyQuery {
      users {
        email
        edges {
          toUser {
            email
          }
        }
      }
    }
  `;

  let data = await gqlClient.request(query);

  console.log(data)
  

  // expect(rootStore.graph.nodes.length == 3).toBe(true);
});
