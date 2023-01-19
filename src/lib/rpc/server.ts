import { AsyncCall } from 'async-call-rpc'

import { A2ZChannel } from './channel'

import type { Aria2 } from './types'

export const server = AsyncCall<Aria2>({}, { channel: new A2ZChannel({
  url: import.meta.env.A2Z_RPC_URL,
  secret: import.meta.env.A2Z_RPC_SECRET
}) })
