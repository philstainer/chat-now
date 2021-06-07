import {NextFunction, Request, Response} from 'express'

import {verifyToken} from '@/utils/verifyToken'

export const authentication = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authorization = req.headers?.authorization

  if (authorization) {
    const user = verifyToken(req.headers.authorization)

    req.userId = user.sub
  }

  next()
}
