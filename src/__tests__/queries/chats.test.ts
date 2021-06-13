import {gql} from 'apollo-server-express'

import {apolloServer} from '@/graphql/apolloServer'
import {prisma} from '@/graphql/context'

const query = gql`
  query ChatsQuery {
    chats {
      id
      users {
        id
      }
      createdAt
    }
  }
`

test('should throw error if not logged in', async () => {
  const ctx = {req: {session: {}}}
  const result = await apolloServer.executeOperation({query}, ctx)

  expect(result.errors?.[0].message).toMatch(/not authorized/i)
})

test('should return chats for user', async () => {
  const data = {
    fullName: 'Phil Stainer',
    email: 'me@philstainer.io',
    password: 'strongP@ssw0rd123',
  }

  const newChat = await prisma.chat.create({
    data: {users: {create: data}},
    include: {users: true},
  })

  const ctx = {req: {session: {userId: newChat.users[0].id}}}
  const result = await apolloServer.executeOperation({query}, ctx)

  expect(result.data?.chats).toHaveLength(1)

  const [chat] = result.data?.chats

  expect(chat.id).toEqual(newChat.id)
  expect(chat.users).toHaveLength(1)
  expect(chat.users[0].id).toEqual(newChat.users[0].id)
})
