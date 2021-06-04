import jwt from 'jsonwebtoken'

import {JWT_SECRET} from '@/config/constants'

export const generateToken = (info: any): string =>
  jwt.sign(info, JWT_SECRET, {expiresIn: '365 days'})
