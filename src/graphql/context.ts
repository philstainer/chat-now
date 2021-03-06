import {PrismaClient} from '@prisma/client'
import {ExpressContext, PubSub} from 'apollo-server-express'
import {Session} from 'express-session'

import {IS_DEV} from '@/config/constants'
import {pubsub} from '@/graphql/pubsub'

export interface RSession extends Session {
  userId?: string
}

export interface Context {
  prisma: PrismaClient
  pubsub: PubSub
  select: any
  session: RSession
}

export const prisma = new PrismaClient({
  log: IS_DEV ? ['query', 'info', `warn`, `error`] : [],
})

export const context = ({req, connection}: ExpressContext): Context => {
  const session = req?.session || connection?.context?.session

  return {
    session,
    prisma,
    pubsub,
    select: {},
  }
}
