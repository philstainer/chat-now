// Load .env when not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Catch uncaught exceptions
process.on('uncaughtException', er => {
  console.error(er.stack)
  server?.close()
  process.exit(1)
})

const {server} = require('@/server').createApp()
