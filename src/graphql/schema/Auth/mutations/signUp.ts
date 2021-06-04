import {ApolloError} from 'apollo-server-express'
import {arg, mutationField, nonNull, stringArg} from 'nexus'

import {AuthPayload} from '@/graphql/schema/Auth/type'
import {GQLEmail} from '@/graphql/schema/Root'
import {generateToken} from '@/utils/generateToken'
import {hashPassword} from '@/utils/hashPassword'

export const emailExistsError = 'Email in use. Use a different email or log in'

export const signUp = mutationField('signUp', {
  type: AuthPayload.name,
  args: {
    fullName: nonNull(stringArg()),
    email: nonNull(arg({type: GQLEmail})),
    password: nonNull(stringArg()),
  },
  resolve: async (_parent, args, ctx, _info) => {
    const {email, password} = args

    const existingUser = await ctx.prisma.user.findUnique({where: {email}})
    if (existingUser) throw new ApolloError(emailExistsError)

    const hashedPassword = await hashPassword(password)

    const newUser = await ctx.prisma.user.create({
      data: {...args, email, password: hashedPassword},
    })

    const token = generateToken({sub: newUser.id})

    return {token, user: newUser}
  },
})
