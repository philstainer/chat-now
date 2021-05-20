import {ApolloServer, gql} from 'apollo-server-express'

import {context} from '@/graphql/context'

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})