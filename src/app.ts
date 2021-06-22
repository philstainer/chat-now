import compression from 'compression'
import express from 'express'

import {corsMiddleware} from '@/middleware/cors'

import {sessionMiddleware} from './middleware/session'

const app = express()

app.use(corsMiddleware)

app.use(compression())

app.use(sessionMiddleware)

export {app}
