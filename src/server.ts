import {createServer} from 'http'

import {app} from '@/app'
import {PORT} from '@/config/constants'
import {apolloServer} from '@/graphql/apolloServer'
import {logger} from '@/utils/logger'

export const createApp = () => {
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

  return {server}
}
