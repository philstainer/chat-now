import {PrismaClient} from '@prisma/client'
import {PubSub} from 'apollo-server-express'

import {IS_DEV} from '@/config/constants'
import {pubsub} from '@/graphql/pubsub'

export interface Context {
  prisma: PrismaClient
  userId?: string
  pubsub: PubSub
  select: any
}

export const prisma = new PrismaClient({
  log: IS_DEV ? ['query', 'info', `warn`, `error`] : [],
})

export const context = ({req}: any): Context => {
  const userId = req?.userId

  return {
    userId,
    prisma: prisma,
    pubsub,
    select: {},
  }
}
