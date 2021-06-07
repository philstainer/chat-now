import {ApolloServer} from 'apollo-server-express'

import {IS_DEV} from '@/config/constants'
import {context} from '@/graphql/context'
import {schema} from '@/graphql/schema'
import {subscriptions} from '@/graphql/subscriptions'

export const apolloServer = new ApolloServer({
  schema,
  context,
  subscriptions,
  playground: IS_DEV ? {settings: {'request.credentials': 'include'}} : false,
  introspection: IS_DEV,
  tracing: IS_DEV,
})
