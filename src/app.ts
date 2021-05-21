import compression from 'compression'
import express from 'express'

import {apolloServer} from '@/graphql/apolloServer'

export const app = express()

app.use(compression())

apolloServer.applyMiddleware({app})
