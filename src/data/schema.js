import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
import { resolvers } from './resolvers';


const typeDefs = `
  type Query {
    hello: String
    me: Viewer
  }

  interface Viewer {
    type: String!,
    user: User
  }

  type Public implements Viewer {
  }

  type User implements Viewer {
    id: ID!,
    username: String!,
    name: String!,
    email: String!
  }
  schema {
    query: Query
  }
`;
const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
