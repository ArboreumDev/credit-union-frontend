import { initializeGQL } from "./graphql_client";

export async function getGQLDataSS(query) {
         const gqlClient = initializeGQL();
         console.log(query)

         var data = await gqlClient.request(query);
         
         console.log(data)
         return data
       }