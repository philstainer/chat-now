import {gql, makeExecutableSchema} from 'apollo-server-express'
import {applyMiddleware} from 'graphql-middleware'

import {permissions} from '@/graphql/permissions'

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => {
      return 'Hello world!'
    },
  },
}

const combinedSchemas = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export const schema = applyMiddleware(combinedSchemas, permissions)
