import {PrismaSelect} from '@paljs/plugins'
import {list, nonNull, queryField} from 'nexus'

import {Chat} from '@/graphql/schema/Chat/type'

export const chats = queryField('chats', {
  type: nonNull(list(nonNull(Chat.name))),
  authorize: (root, args, {session}) => !!session?.userId,
  resolve: (_parent, _args, {session, prisma}, info) => {
    const select = new PrismaSelect(info).value

    return prisma.chat.findMany({
      where: {users: {some: {id: session?.userId}}},
      ...select,
    })
  },
})
