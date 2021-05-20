if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

import express from 'express'
import {apolloServer} from '@/graphql/apolloServer'
import {logger} from '@/utils/logger'
import {port} from '@/config/constants'

const app = express()

apolloServer.applyMiddleware({app})

app.listen(port, () => {
  logger.info(
    `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  )
})
