import {rule, shield} from 'graphql-shield'

import {Context} from '@/graphql/context'

export const rules = {
  isAuthenticatedUser: rule()((_parent, _args, _context: Context) => {
    return false
  }),
}

export const permissions = shield({
  Query: {hello: rules.isAuthenticatedUser},
})
