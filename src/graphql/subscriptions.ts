interface Params {
  authorization?: string
}

const onConnect = (params: Params): any => {
  return {params}
}

export const subscriptions = {
  onConnect,
}
