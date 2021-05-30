import {objectType} from 'nexus'

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.string('id', {description: 'Id of the message'})
    t.string('text', {description: 'text of the message'})
    t.dateTime('createdAt', {description: 'createdAt of the message'})
    t.dateTime('updatedAt', {description: 'updatedAt of the message'})
  },
})
