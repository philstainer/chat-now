import {accessEnv} from '@/utils/accessEnv'

export const isDev = accessEnv('NODE_ENV') === 'development'
export const isTest = accessEnv('NODE_ENV') === 'test'
export const isProduction = accessEnv('NODE_ENV') === 'production'
export const port = accessEnv('PORT', '4000')
