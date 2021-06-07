import {verifyToken} from '@/utils/verifyToken'

interface Params {
  authorization?: string
}

const onConnect = (params: Params): any => {
  const user = verifyToken(params.authorization)

  return {
    userId: user.sub,
  }
}

export const subscriptions = {
  onConnect,
}
