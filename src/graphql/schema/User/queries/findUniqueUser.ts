import {PrismaSelect} from '@paljs/plugins'
import {arg, inputObjectType, nonNull, nullable, queryField} from 'nexus'

import {User} from '@/graphql/schema/User/type'

export const UserFilters = inputObjectType({
  name: 'UserFilters',
  definition: t => {
    t.nonNull.string('id')
  },
})

export const findUniqueUser = queryField('findUniqueUser', {
  type: nullable(User.name),
  args: {where: nonNull(arg({type: UserFilters.name}))},
  resolve: (_parent, {where}, {prisma}, info) => {
    const select = new PrismaSelect(info).value

    return prisma.user.findUnique({where, ...select})
  },
})
