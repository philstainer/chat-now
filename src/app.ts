import {PrismaSessionStore} from '@quixo3/prisma-session-store'
import compression from 'compression'
import express from 'express'
import expressSession from 'express-session'
import ms from 'ms'

import {apolloServer} from '@/graphql/apolloServer'
import {cors} from '@/middleware/cors'

import {COOKIE_SECRET, IS_PRODUCTION} from './config/constants'
import {prisma} from './graphql/context'

export const app = express()

app.use(cors)

app.use(compression())

app.use(
  expressSession({
    cookie: {
      maxAge: ms('7 days'),
      httpOnly: true,
      secure: IS_PRODUCTION,
    },
    saveUninitialized: false,
    resave: false,
    secret: COOKIE_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: ms('5m'),
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
)

apolloServer.applyMiddleware({app, cors: false, path: '/graphql'})
