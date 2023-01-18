import { AsyncCall } from 'async-call-rpc'

import { A2ZChannel } from './channel'

import type { Aria2 } from './types'

export const server = AsyncCall<Aria2>({}, { channel: new A2ZChannel() })
