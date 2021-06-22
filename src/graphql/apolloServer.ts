import {ApolloServer, AuthenticationError} from 'apollo-server-express'
import {Request, Response} from 'express'

import {IS_DEV} from '@/config/constants'
import {context, RSession} from '@/graphql/context'
import {schema} from '@/graphql/schema'
import {sessionMiddleware} from '@/middleware/session'

export const authError = 'Not Authenticated'

export const apolloServer = new ApolloServer({
  schema,
  context,
  subscriptions: {
    path: '/subscriptions',
    onConnect: (_params, _ws, ctx) => {
      return new Promise((resolve, reject) => {
        const req = ctx.request as Request
        const res = {} as Response

        sessionMiddleware(req, res, () => {
          const userId = (req?.session as RSession)?.userId

          if (!userId) reject(new AuthenticationError(authError))

          resolve({session: req?.session})
        })
      })
    },
  },
  playground: IS_DEV ? {settings: {'request.credentials': 'include'}} : false,
  introspection: IS_DEV,
  tracing: IS_DEV,
})
