import { gql } from '@apollo/client';
import fetch from 'node-fetch'

import { ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';

const API_URL = 'https://right-thrush-43.hasura.app/v1/graphql'

const client = new ApolloClient({
  link: createHttpLink({
    uri: API_URL,
    fetch: fetch,
    headers: {
      'Content-Type': 'application/json',
      'Hasura-Client-Name': 'hasura-console',
      'hasura-collaborator-token': 'IDToken eyJhbGciOiJSUzI1NiIsImtpZCI6InB1YmxpYzoyMzIyM2JiNi1lODQ3LTRhMTAtOThhNS02Yzk1YjZlYWUxOGEiLCJ0eXAiOiJKV1QifQ.eyJhbGxvd2VkX3NjaGVtYXMiOltdLCJhbGxvd2VkX3RhYmxlcyI6e30sImF0X2hhc2giOiJHR21mVmI5YjU0UHg5eXhNNzdCNjV3IiwiYXVkIjpbImU5ZTY0ZTZjLWIxZTktNGQwYy05MmFhLTcxOGNjYjgxZmI0Zl9jb25zb2xlIl0sImF1dGhfdGltZSI6MTU5NTcxNjk5MiwiY29sbGFib3JhdG9yX3ByaXZpbGVnZXMiOlsiYWRtaW4iLCJncmFwaHFsX2FkbWluIiwidmlld19tZXRyaWNzIl0sImV4cCI6MTU5NTcyNDE2NCwiaWF0IjoxNTk1NzIwNTY0LCJpc3MiOiJodHRwczovL29hdXRoLnByby5oYXN1cmEuaW8vIiwianRpIjoiNjg5ODNiYTYtODNjYi00YWM1LWE1MmUtZmYzZGEyOTM4ZGI2IiwibWV0cmljc19mcWRuIjoidXMtZWFzdC0yLWF3cy1tZXRyaWNzLWNsb3VkLmhhc3VyYS1hcHAuaW8iLCJub25jZSI6IiIsInByb2plY3QiOnsiaWQiOiI3NTE0YjhhYS03NTFiLTQ0ZTctODViZi02NTE1NmU4ZmNlN2IiLCJuYW1lIjoicmlnaHQtdGhydXNoLTQzIn0sInJhdCI6MTU5NTcxNjk5MSwic2lkIjoiZjBiYTg3MmUtYTI0Ni00ZWQ5LTk4YjAtNzQzYzIwNDg3NjdiIiwic3ViIjoiY2U2NmJjMzMtNzI2YS00YjA0LTkwNDktNjkyN2ZhYjc3ODZiIn0.s1-uTOkaGRe8oqJXjR29xjuxf85LqDvrAOXsyGJCTjH2SCO2E6f5UadJkLpU6y_E57w7skxL1sz0r9hVIxctjgJCNrfLmwuwij8nWZUSnINTf_Epq7V3BPZh9hG9I3xzHgI0aaNDlVLqXeG3NyU1J80uM4pKDxzRpuXAe8XZx2xX37ql0RypHWLE7f0_J6_4avA6gfR6mZmSqI0jZSlHSBDabBKm55m6c4qizBxkcLlTQyqiNU2OtCUY6BpU9UuaKV_CV38LWYG30y49DR0Ccj7aG6-oAgP4bISon5UCvdy2WzAe9xcxR2CStfDuymybQzIIgyFS5TDqQxiYPmZ0Ub0UOwj-Zziz9dSmhpuKpEUgz6xFMrXVMHgjKZzxijxYyi-SXYE3mOVlOs7fPl9BopJbaTD6lsvg0ClRMhMslOmfkK0kVsQbggZecG8NGXrfQKmley16DfnIdQ1pahlax0gHgmh5NhNfhJ9be8HYDGkCd9Y50AMOwZZrxjl_pDDphdCbs2WjQYhkXO0svmppovZhfMedvLDfQNLcTZCdRuZyphx59m-QjFNOTeHUJRJddM8AKjT_NfTYzT3HWAOHn3XEdmuPsimBn1TG4CySpMBprh__ZZuw_333jJL6e8N7q0_8PB5OgrszfHrvwftmBgmIgNzLEIJ0Ysv0Rlj-tHI'
    }
  }),
  cache: new InMemoryCache()
});

test('Found 3 nodes in initGraph', async () => {
  const data = await client
    .query({
      query: gql`
      query MyQuery {
      users {
        name
        email
        edges {
          user {
            name
          }
        }
      }
    }

    `
    })
    .then(result => console.log(result.data.users[0].edges));

  // expect(rootStore.graph.nodes.length == 3).toBe(true);
});
