import {gql} from 'apollo-server-express'
import {verify} from 'jsonwebtoken'

import {JWT_SECRET} from '@/config/constants'
import {apolloServer} from '@/graphql/apolloServer'
import {prisma} from '@/graphql/context'
import {genericError} from '@/graphql/schema/Auth'
import {hashPassword} from '@/utils/hashPassword'

const query = gql`
  mutation SignInMutation($email: EmailAddress!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        fullName
        email
      }
    }
  }
`

test('should throw error when user not found', async () => {
  const data = {
    email: 'me@philstainer.io',
    password: 'strongP@ssw0rd123',
  }

  const result = await apolloServer.executeOperation({query, variables: data})

  expect(result.errors?.[0].message).toEqual(genericError)
})

test('should throw error when passwords do not match', async () => {
  const data = {
    email: 'me@philstainer.io',
    password: 'wrongP@ssw0rd123',
  }

  const hashedPassword = await hashPassword('rightP@ssword123')

  await prisma.user.create({
    data: {...data, password: hashedPassword, fullName: 'Phil'},
  })

  const result = await apolloServer.executeOperation({query, variables: data})

  expect(result.errors?.[0].message).toEqual(genericError)
})

test('should return user and token', async () => {
  const data = {
    email: 'me@philstainer.io',
    password: 'strongP@ssw0rd123',
  }

  const hashedPassword = await hashPassword(data.password)

  const createdUser = await prisma.user.create({
    data: {...data, password: hashedPassword, fullName: 'Phil'},
  })

  const result = await apolloServer.executeOperation({query, variables: data})

  const {token, user} = result.data?.signIn
  expect(user).toMatchObject({email: data.email})

  const {sub} = verify(token, JWT_SECRET) as any
  expect(sub).toEqual(createdUser.id)
})
