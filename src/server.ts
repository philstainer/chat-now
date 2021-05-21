// Load .env when not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Catch uncaught exceptions
process.on('uncaughtException', er => {
  console.error(er.stack)
  server?.close()
  process.exit(1)
})

import compression from 'compression'
import express from 'express'
import {createServer} from 'http'

import {PORT} from '@/config/constants'
import {apolloServer} from '@/graphql/apolloServer'
import {logger} from '@/utils/logger'

const app = express()

app.use(compression())

apolloServer.applyMiddleware({app})
const server = createServer(app)
apolloServer.installSubscriptionHandlers(server)

app.listen(PORT, () => {
  logger.info(
    `🚀 Server ready at http://localhost:${PORT}${
      apolloServer.graphqlPath
    } (${app.get('env')})`
  )

  logger.info(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${
      apolloServer.subscriptionsPath
    } (${app.get('env')})`
  )
})
