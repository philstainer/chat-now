import {arg, intArg, objectType} from 'nexus'

export const Chat = objectType({
  name: 'Chat',
  definition(t) {
    t.nonNull.id('id', {description: 'Id of the message'})
    t.nonNull.list.nonNull.field('users', {type: 'User'})
    t.nonNull.list.nonNull.field('messages', {
      type: 'Message',
      args: {
        skip: intArg(),
        take: intArg(),
        orderBy: arg({type: 'SortArgs'}),
      },
    })
    t.nonNull.dateTime('createdAt', {description: 'createdAt of the message'})
    t.nonNull.dateTime('updatedAt', {description: 'updatedAt of the message'})
  },
})
