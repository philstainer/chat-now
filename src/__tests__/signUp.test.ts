import {gql} from 'apollo-server-express'
import {verify} from 'jsonwebtoken'

import {JWT_SECRET} from '@/config/constants'
import {apolloServer} from '@/graphql/apolloServer'
import {prisma} from '@/graphql/context'
import {emailExistsError} from '@/graphql/schema/Auth'

const query = gql`
  mutation SignUpMutation(
    $fullName: String!
    $email: EmailAddress!
    $password: String!
  ) {
    signUp(fullName: $fullName, email: $email, password: $password) {
      token
      user {
        id
        fullName
        email
      }
    }
  }
`

test('should throw error if user already exists', async () => {
  const data = {
    fullName: 'Phil Stainer',
    email: 'me@philstainer.io',
    password: 'strongP@ssw0rd123',
  }

  await prisma.user.create({data})

  const result = await apolloServer.executeOperation({query, variables: data})

  expect(result.errors?.[0].message).toEqual(emailExistsError)
})

test('should create and return user and token', async () => {
  const data = {
    fullName: 'Phil Stainer',
    email: 'phil@philstainer.io',
    password: 'strongP@ssw0rd123',
  }

  const result = await apolloServer.executeOperation({query, variables: data})

  const createdUser = await prisma.user.findUnique({where: {email: data.email}})
  expect(createdUser).toBeTruthy()

  const {token, user} = result.data?.signUp
  expect(user).toMatchObject({fullName: data.fullName, email: data.email})

  const {sub} = verify(token, JWT_SECRET) as any
  expect(sub).toEqual(user.id)
})
