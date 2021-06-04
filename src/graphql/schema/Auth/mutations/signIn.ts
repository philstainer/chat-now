import {ApolloError} from 'apollo-server-express'
import {compare} from 'bcryptjs'
import {arg, mutationField, nonNull, stringArg} from 'nexus'

import {AuthPayload} from '@/graphql/schema/Auth/type'
import {GQLEmail} from '@/graphql/schema/Root'
import {generateToken} from '@/utils/generateToken'

export const genericError = 'Incorrect email or password, please try again.'

export const signIn = mutationField('signIn', {
  type: AuthPayload.name,
  args: {
    email: nonNull(arg({type: GQLEmail})),
    password: nonNull(stringArg()),
  },
  resolve: async (_parent, args, ctx, _info) => {
    const {email, password} = args

    const existingUser = await ctx.prisma.user.findUnique({where: {email}})
    if (!existingUser) throw new ApolloError(genericError)

    const passwordsMatch = await compare(password, existingUser.password)
    if (!passwordsMatch) throw new ApolloError(genericError)

    const token = generateToken({sub: existingUser.id})

    return {token, user: existingUser}
  },
})
