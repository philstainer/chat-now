import corsModule from 'cors'

import {IS_DEV} from '@/config/constants'

// Allow all
const corsOptions = {
  origin: IS_DEV ? new RegExp('/*/') : '',
  credentials: true,
}

export const corsMiddleware = corsModule(corsOptions)
