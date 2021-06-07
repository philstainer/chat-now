import {gql} from 'apollo-server-express'

import {apolloServer} from '@/graphql/apolloServer'
import {prisma} from '@/graphql/context'

const query = gql`
  query MeQuery {
    me {
      id
      fullName
      email
    }
  }
`

test('should return null when not logged in', async () => {
  const result = await apolloServer.executeOperation({query})

  expect(result.data?.me).toBeNull()
})

test('should return logged in user', async () => {
  const {id, fullName, email} = await prisma.user.create({
    data: {email: 'email@me.com', password: 'password', fullName: 'Phil'},
  })

  const ctx = {req: {session: {userId: id}}}

  const result = await apolloServer.executeOperation({query}, ctx)

  expect(result.data?.me).toMatchObject({id, fullName, email})
})
