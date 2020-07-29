import { initializeApollo } from "./graphql_client";

export async function getApolloDataSS(query) {
    const apolloClient = initializeApollo();

    await apolloClient.query({
    query: query,
    });
    console.log(apolloClient.cache.extract());

    return {
    props: {
        initialApolloState: apolloClient.cache.extract(),
    },
    };
}