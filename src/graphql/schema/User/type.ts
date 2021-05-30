import {objectType} from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id', {description: 'Id of the user'})
    t.string('fullName', {description: 'fullName of the user'})
    t.string('displayName', {description: 'displayName of the user'})
    t.email('email', {description: 'email of the user'})
    t.nullable.string('emailVerified', {description: 'verified of the user'})
    t.nullable.string('image', {description: 'image of the user'})
    t.list.field('chats', {type: 'Chat'})
    t.dateTime('createdAt', {description: 'createdAt of the user'})
    t.dateTime('updatedAt', {description: 'updatedAt of the user'})
  },
})
