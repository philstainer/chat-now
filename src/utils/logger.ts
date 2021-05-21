import {createLogger, format, transports} from 'winston'

import {IS_DEV, IS_PRODUCTION} from '@/config/constants'

const LoggerLevel = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  verbose: 'verbose',
  debug: 'debug',
  silly: 'silly',
}

const PROD_LOG_LEVEL = LoggerLevel.info
const DEV_LOG_LEVEL = LoggerLevel.debug

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.splat(),
    format.simple(),
    format.timestamp()
  ),
  transports: [
    new transports.Console({
      level: IS_PRODUCTION ? PROD_LOG_LEVEL : DEV_LOG_LEVEL,
    }),
  ],
})

if (IS_DEV) {
  logger.debug('Logging initialized at debug level')
}

export {logger}
