import {AuthenticationError} from 'apollo-server-express'
import {verify} from 'jsonwebtoken'

import {JWT_SECRET} from '@/config/constants'

export const jwtVerifyError = 'Failed to verify token'
export const jwtMissingError = 'Missing auth token'

interface Payload {
  sub: string
}

export const verifyToken = (token?: string): Payload => {
  if (!token) throw new AuthenticationError(jwtMissingError)

  try {
    const payload = verify(token.replace('Bearer ', ''), JWT_SECRET) as Payload

    return payload
  } catch (error) {
    throw new AuthenticationError(jwtVerifyError)
  }
}
