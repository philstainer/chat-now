import {ApolloError} from 'apollo-server-express'
import {compare} from 'bcryptjs'
import {arg, mutationField, nonNull, stringArg} from 'nexus'

import {GQLEmail} from '@/graphql/schema/Root'
import {User} from '@/graphql/schema/User/type'

export const genericError = 'Incorrect email or password, please try again.'

export const signIn = mutationField('signIn', {
  type: nonNull(User.name),
  args: {
    email: nonNull(arg({type: GQLEmail})),
    password: nonNull(stringArg()),
  },
  authorize: (root, args, {session}) => !session?.userId,
  resolve: async (_parent, args, ctx, _info) => {
    const {email, password} = args

    const existingUser = await ctx.prisma.user.findUnique({where: {email}})
    if (!existingUser) throw new ApolloError(genericError)

    const passwordsMatch = await compare(password, existingUser.password)
    if (!passwordsMatch) throw new ApolloError(genericError)

    ctx.session.userId = existingUser.id

    return existingUser
  },
})
