import { AsyncCall } from 'async-call-rpc'
import { A2Channel, type A2ChannelOptions } from './channel'
import type { Aria2 } from './methods'

export const createClient = (options: A2ChannelOptions) =>
  AsyncCall<Aria2>({}, { channel: new A2Channel(options) })

export { A2Channel, type A2ChannelOptions } from './channel'
export type { Aria2 } from './methods'
export type { Status, Uri, File, Peer, Server, TellStatusResult } from './types'
export type { _AsyncVersionOf } from 'async-call-rpc'
