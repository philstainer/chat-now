import {
  DateTimeResolver,
  EmailAddressResolver,
  URLResolver,
} from 'graphql-scalars'
import {
  asNexusMethod,
  enumType,
  inputObjectType,
  objectType,
  queryField,
} from 'nexus'

export const GQLDate = asNexusMethod(DateTimeResolver, 'dateTime')
export const GQLEmail = asNexusMethod(EmailAddressResolver, 'email')
export const GQLURL = asNexusMethod(URLResolver, 'url')

export const usersQueryField = queryField('ok', {
  type: 'Boolean',
  resolve: (_parent, _args, _ctx, _info) => true,
})

export const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
  description: 'Sort order',
})

export const SortArgs = inputObjectType({
  name: 'SortArgs',
  definition(t) {
    t.field('createdAt', {type: 'SortOrder'})
    t.field('updatedAt', {type: 'SortOrder'})
  },
})

export const session = objectType({
  name: 'Session',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('sid')
    t.nonNull.string('data')
    t.nonNull.dateTime('expiresAt')
  },
})
