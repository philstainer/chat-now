import {createServer} from 'http'

import {app} from '@/app'
import {PORT} from '@/config/constants'
import {apolloServer} from '@/graphql/apolloServer'
import {logger} from '@/utils/logger'

const httpServer = createServer(app)

apolloServer.applyMiddleware({app, cors: false, path: '/graphql'})
apolloServer.installSubscriptionHandlers(httpServer)

// Catch uncaught exceptions
process.on('uncaughtException', er => {
  console.error(er.stack)
  httpServer?.close()
  process.exit(1)
})

httpServer.listen(PORT, () => {
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
