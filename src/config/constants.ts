import {accessEnv} from '@/utils/accessEnv'

export const IS_DEV = accessEnv('NODE_ENV') === 'development'
export const IS_TEST = accessEnv('NODE_ENV') === 'test'
export const IS_PRODUCTION = accessEnv('NODE_ENV') === 'production'
export const PORT = accessEnv('PORT', '4000')

export const SALT_ROUNDS = accessEnv('SALT_ROUNDS', 10)
export const COOKIE_SECRET = accessEnv('COOKIE_SECRET')
