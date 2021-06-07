import {PrismaSelect} from '@paljs/plugins'
import {nullable, queryField} from 'nexus'

import {User} from '@/graphql/schema/User/type'

export const me = queryField('me', {
  type: nullable(User.name),
  resolve: (_parent, _args, {session, prisma}, info) => {
    const userId = session?.userId

    if (!userId) return null

    const select = new PrismaSelect(info).value

    return prisma.user.findUnique({where: {id: userId}, ...select})
  },
})
