import corsModule from 'cors'

import {IS_DEV} from '@/config/constants'

// Allow all
const corsOptions = {
  origin: IS_DEV ? new RegExp('/*/') : '',
}

export const cors = corsModule(corsOptions)
