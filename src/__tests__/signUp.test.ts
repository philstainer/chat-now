import {gql} from 'apollo-server-express'

import {apolloServer} from '@/graphql/apolloServer'
import {prisma, RSession} from '@/graphql/context'
import {emailExistsError} from '@/graphql/schema/Auth'
import {passwordError} from '@/utils/hashPassword'

const query = gql`
  mutation SignUpMutation(
    $fullName: String!
    $email: EmailAddress!
    $password: String!
  ) {
    signUp(fullName: $fullName, email: $email, password: $password) {
      id
      fullName
      email
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

test('should throw error if password is weak', async () => {
  const data = {
    fullName: 'Phil Stainer',
    email: 'me@philstainer.io',
    password: 'weakpass',
  }

  const result = await apolloServer.executeOperation({query, variables: data})

  expect(result.errors?.[0].message).toEqual(passwordError)
})

test('should create and return user', async () => {
  const data = {
    fullName: 'Phil Stainer',
    email: 'phil@philstainer.io',
    password: 'strongP@ssw0rd123',
  }

  const ctx = {req: {session: {}}}
  const result = await apolloServer.executeOperation(
    {query, variables: data},
    ctx
  )

  const user = result.data?.signUp
  expect(user).toMatchObject({fullName: data.fullName, email: data.email})

  const createdUser = await prisma.user.findUnique({
    where: {id: user.id},
  })
  expect(createdUser).toBeTruthy()

  expect((ctx.req.session as RSession).userId).toEqual(createdUser?.id)
})
