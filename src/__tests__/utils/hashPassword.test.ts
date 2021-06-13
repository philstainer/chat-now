import {compare} from 'bcryptjs'

import {hashPassword, passwordError} from '@/utils/hashPassword'

jest.mock('@/config/constants', () => ({SALT_ROUNDS: 1}))

test('should return error on weak password', async () => {
  try {
    await hashPassword('weak')
  } catch (e) {
    expect(e.message).toEqual(passwordError)
  }
})

test('should hash password', async () => {
  const password = 'str3P@ss123'
  const hashedPassword = await hashPassword(password)
  const matched = await compare(password, hashedPassword)

  expect(matched).toBeTruthy()
})
