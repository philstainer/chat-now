import {objectType} from 'nexus'

import {User} from '@/graphql/schema/User'

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition: t => {
    t.nonNull.jwt('token')
    t.nonNull.field(User.name.toLowerCase(), {type: User.name})
  },
})
