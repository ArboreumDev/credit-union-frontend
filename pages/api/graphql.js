import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from "micro-cors";
import DataLoader from "dataloader";
import knex from "knex";

const db = knex({
    client: "pg",
    connection: process.env.DATABASE_URL
});
const typeDefs = gql `
  type Query {
    users: [User!]!
    projects: [Project!]!
  }
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

const resolvers = {
    Query: {
        users(parent, args, context) {
            return db.select("*").from("users").limit(10)
        },
        projects(parent, args, context) {
            return db.select("*").from("projects").limit(10)
        },
    },
    Project: {
        created_by: (project, _args, { loader }) => {
            return loader.user.load(project.created_by);
        }
    }
}

const loader = {
    user: new DataLoader(ids =>
        db
        .select("*")
        .from("users")
        .whereIn("id", ids)
        .then(rows => ids.map(id => rows.find(row => row.id === id)))
    )
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return { loader };
    }
});

export const config = {
    api: {
        bodyParser: false,
    },
}

export default apolloServer.createHandler({ path: '/api/graphql' })