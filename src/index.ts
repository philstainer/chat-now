import {createServer} from 'http'

import {app} from '@/app'
import {PORT} from '@/config/constants'
import {apolloServer} from '@/graphql/apolloServer'
import {logger} from '@/utils/logger'

const server = createServer(app)

// Catch uncaught exceptions
process.on('uncaughtException', er => {
  console.error(er.stack)
  server?.close()
  process.exit(1)
})

apolloServer.installSubscriptionHandlers(server)

server.listen(PORT, () => {
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
