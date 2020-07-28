import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from 'cross-fetch'

const API_URL = 'https://right-thrush-43.hasura.app/v1/graphql'
console.log(process.env.HASURA_ADMIN_SECRET);
export const client = new ApolloClient({
         link: createHttpLink({
           uri: API_URL,
           fetch,
           headers: {
             "Content-Type": "application/json",
             "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET,
           },
         }),
         cache: new InMemoryCache(),
         ssrMode: true
       });

