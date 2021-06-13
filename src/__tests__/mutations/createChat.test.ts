import {gql} from 'apollo-server-express'
import faker from 'faker'

import {apolloServer} from '@/graphql/apolloServer'
import {prisma} from '@/graphql/context'
import {existingChatError, uniqueUsersError} from '@/graphql/schema/Chat'

const query = gql`
  mutation CreateChatMutation($users: [ID!]!) {
    createChat(users: $users) {
      id
      users {
        id
      }
    }
  }
`

test('should throw error when not logged in', async () => {
  const data = {
    users: ['id'],
  }

  const ctx = {req: {session: {}}}
  const result = await apolloServer.executeOperation(
    {query, variables: data},
    ctx
  )

  expect(result.errors?.[0].message).toMatch(/not authorized/i)
})

test('should throw error when less then 2 unique users', async () => {
  const data = {
    users: ['1'],
  }

  const ctx = {req: {session: {userId: '1'}}}
  const result = await apolloServer.executeOperation(
    {query, variables: data},
    ctx
  )

  expect(result.errors?.[0].message).toEqual(uniqueUsersError)
})

test('should throw error when a user does not exist', async () => {
  const data = {
    users: ['1'],
  }

  const ctx = {req: {session: {userId: '2'}}}
  const result = await apolloServer.executeOperation(
    {query, variables: data},
    ctx
  )

  expect(result.errors?.[0].message).toMatch(
    /expected 2 records to be connected/i
  )
})

test('should throw error when chat between users already exists', async () => {
  const newChat = await prisma.chat.create({
    data: {
      users: {
        create: [
          {
            email: faker.internet.email(),
            fullName: faker.name.findName(),
            password: faker.internet.password(),
          },
          {
            email: faker.internet.email(),
            fullName: faker.name.findName(),
            password: faker.internet.password(),
          },
        ],
      },
    },
    include: {users: true},
  })

  const data = {
    users: [newChat.users[0].id],
  }

  const ctx = {req: {session: {userId: newChat.users[1].id}}}
  const result = await apolloServer.executeOperation(
    {query, variables: data},
    ctx
  )

  expect(result.errors?.[0].message).toEqual(existingChatError)
})

test('should create chat successfully', async () => {
  const user = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      fullName: faker.name.findName(),
      password: faker.internet.password(),
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      fullName: faker.name.findName(),
      password: faker.internet.password(),
    },
  })

  const data = {
    users: [user.id],
  }

  const ctx = {req: {session: {userId: user2.id}}}
  const result = await apolloServer.executeOperation(
    {query, variables: data},
    ctx
  )

  const createdChat = result.data?.createChat

  expect(createdChat.id).toBeDefined()
  expect(createdChat.users).toMatchObject([{id: user.id}, {id: user2.id}])
})
