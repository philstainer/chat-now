import {prisma} from '@/graphql/context'
import {logger} from '@/utils/logger'

beforeAll(() => prisma.$connect())

const resetDatabase = async () => {
  for (const {
    tablename,
  } of await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$queryRaw(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
        )
      } catch (error) {
        logger.error({error})
      }
    }
  }
}

beforeEach(async () => {
  await resetDatabase()
})

afterAll(() => prisma.$disconnect())
