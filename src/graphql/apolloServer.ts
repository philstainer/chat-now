import {ApolloServer} from 'apollo-server-express'

import {IS_DEV} from '@/config/constants'
import {context} from '@/graphql/context'
import {schema} from '@/graphql/schema'

// const getCookie = (cookieSrc, cname) => {
//   const name = cname + '='
//   if (cookieSrc) {
//     const ca = cookieSrc.split(';')
//     for (let obj of ca) {
//       while (obj.charAt(0) === ' ') {
//         obj = obj.substring(1)
//       }
//       if (obj.indexOf(name) === 0) {
//         return obj.substring(name.length, obj.length)
//       }
//     }
//   }
//   return ''
// }

export const apolloServer = new ApolloServer({
  schema,
  context,
  subscriptions: {
    path: '/subscriptions',
    // onConnect: (params, webSocket) => {
    //   // console.log(webSocket?.upgradeReq?.session)
    //   // console.log(webSocket?.upgradeReq?.headers)
    //   // const cookie = webSocket?.upgradeReq?.headers?.cookie
    //   // const userId = getCookie(cookie, 'userId')
    //   // console.log(userId)
    // },
  },
  playground: IS_DEV ? {settings: {'request.credentials': 'include'}} : false,
  introspection: IS_DEV,
  tracing: IS_DEV,
})
