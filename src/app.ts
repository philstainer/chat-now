import compression from 'compression'
import express from 'express'

import {apolloServer} from '@/graphql/apolloServer'
import {cors} from '@/middleware/cors'

import {authentication} from './middleware/authentication'

export const app = express()

app.use(cors)

app.use(compression())

app.use(authentication)

apolloServer.applyMiddleware({app, cors: false, path: '/graphql'})
