import {PrismaSelect} from '@paljs/plugins'
import {ForbiddenError, UserInputError} from 'apollo-server-express'
import {idArg, list, mutationField, nonNull} from 'nexus'

import {Chat} from '@/graphql/schema/Chat/type'

export const existingChatError = 'Error chat already exists'
export const uniqueUsersError = 'Error chat needs at least 2 users'

export const createChat = mutationField('createChat', {
  type: nonNull(Chat.name),
  args: {
    users: nonNull(list(nonNull(idArg()))),
  },
  authorize: (_root, _args, {session}) => !!session?.userId,
  resolve: async (_parent, args, {session, prisma}, info) => {
    const users = [...new Set([...args.users, session.userId])].map(id => ({
      id,
    }))

    if (users.length < 2) throw new UserInputError(uniqueUsersError)

    const existingChat = await prisma.chat.findFirst({
      where: {
        users: {
          every: {
            OR: users,
          },
        },
      },
      select: {id: true},
    })

    if (existingChat) throw new ForbiddenError(existingChatError)

    const select = new PrismaSelect(info).value

    const newChat = (await prisma.chat.create({
      data: {users: {connect: users}},
      ...select,
    })) as any

    return newChat
  },
})
