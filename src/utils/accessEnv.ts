import {logger} from '@/utils/logger'

const cache: any = {}

const accessEnv = (key: string, defaultValue?: string) => {
  if (!(key in process.env)) {
    if (defaultValue) return defaultValue

    logger.error(`${key} not found in process.env!`)

    throw new Error(`${key} not found in process.env!`)
  }

  if (cache[key]) return cache[key]

  cache[key] = process.env[key]

  return process.env[key]
}

export {accessEnv}
