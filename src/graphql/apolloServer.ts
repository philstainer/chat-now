import {ApolloServer} from 'apollo-server-express'

import {context} from '@/graphql/context'
import {schema} from '@/graphql/schema'

export const apolloServer = new ApolloServer({
  schema,
  context,
})
