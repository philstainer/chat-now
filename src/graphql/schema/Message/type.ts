import {objectType} from 'nexus'

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.nonNull.id('id', {description: 'Id of the message'})
    t.nonNull.string('text', {description: 'text of the message'})
    t.nonNull.field('user', {type: 'User'})
    t.nonNull.field('chat', {type: 'Chat'})
    t.nonNull.dateTime('createdAt', {description: 'createdAt of the message'})
    t.nonNull.dateTime('updatedAt', {description: 'updatedAt of the message'})
  },
})
