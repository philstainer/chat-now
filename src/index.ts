import {createApp} from '@/server'

const {server} = createApp()

// Catch uncaught exceptions
process.on('uncaughtException', er => {
  console.error(er.stack)
  server?.close()
  process.exit(1)
})
