import {PrismaSessionStore} from '@quixo3/prisma-session-store'
import expressSession from 'express-session'
import ms from 'ms'

import {COOKIE_SECRET, IS_PRODUCTION} from '@/config/constants'
import {prisma} from '@/graphql/context'

export const sessionMiddleware = expressSession({
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
