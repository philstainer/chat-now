import {objectType} from 'nexus'

export const Chat = objectType({
  name: 'Chat',
  definition(t) {
    t.string('id', {description: 'Id of the message'})
    t.list.field('users', {type: 'User'})
    t.list.field('messages', {type: 'Message'})
    t.dateTime('createdAt', {description: 'createdAt of the message'})
    t.dateTime('updatedAt', {description: 'updatedAt of the message'})
  },
})
