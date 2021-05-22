import compression from 'compression'
import express from 'express'

import {apolloServer} from '@/graphql/apolloServer'

import {cors} from './middleware/cors'

export const app = express()

app.use(cors)

app.use(compression())

apolloServer.applyMiddleware({app, cors: false})
