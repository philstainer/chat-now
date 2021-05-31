import {
  DateTimeResolver,
  EmailAddressResolver,
  JWTResolver,
  URLResolver,
} from 'graphql-scalars'
import {asNexusMethod, queryField} from 'nexus'

export const GQLDate = asNexusMethod(DateTimeResolver, 'dateTime')
export const GQLEmail = asNexusMethod(EmailAddressResolver, 'email')
export const GQLJWT = asNexusMethod(JWTResolver, 'jwt')
export const GQLURL = asNexusMethod(URLResolver, 'url')

export const usersQueryField = queryField('ok', {
  type: 'Boolean',
  resolve: (_parent, _args, _ctx, _info) => true,
})
