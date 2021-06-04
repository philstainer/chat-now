import {UserInputError} from 'apollo-server-express'
import {hash} from 'bcryptjs'
import isStrongPassword from 'validator/lib/isStrongPassword'

import {SALT_ROUNDS} from '@/config/constants'

export const passwordError =
  'Use 8 or more characters with a mix of letters, numbers and symbols'

export const hashPassword = (password: string): Promise<string> => {
  if (!isStrongPassword(password)) throw new UserInputError(passwordError)

  return hash(password, SALT_ROUNDS)
}
