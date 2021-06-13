import {objectType} from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id', {description: 'Id of the user'})
    t.nonNull.string('fullName', {description: 'fullName of the user'})
    t.string('displayName', {description: 'displayName of the user'})
    t.nonNull.email('email', {description: 'email of the user'})
    t.nullable.url('image', {description: 'image of the user'})
    t.list.field('chats', {type: 'Chat'})
    t.dateTime('verifiedAt', {description: 'verifiedAt of the user'})
    t.nonNull.dateTime('createdAt', {description: 'createdAt of the user'})
    t.nonNull.dateTime('updatedAt', {description: 'updatedAt of the user'})
  },
})
