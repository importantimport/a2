import type { Uri, File, Peer, Server, TellStatusResult } from './types'
import type { Options } from './options'

/**
 * Aria2 JSON-RPC Methods type definition for Async Call RPC
 * @remarks version 1.36.0
 * @see {@link http://aria2.github.io/manual/en/html/aria2c.html#methods}
 */
export declare class Aria2 extends Aria2System {
  /**
   * This method adds a new download.
   * @example
   * ```ts
   * await aria2.addUri(['http://example.org/file'])
   * ```
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#aria2.addUri}
   */
  declare addUri: (
    uris: string[],
    options?: Partial<Options>,
    position?: number
  ) => string

  /**
   * This method adds a BitTorrent download by uploading a ".torrent" file.
   * @example
   * ```ts
   * await aria2.addTorrent(torrent)
   * ```
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#aria2.addTorrent}
   */
  declare addTorrent: (
    torrent: string,
    uris?: string[],
    options?: Partial<Options>,
    position?: number
  ) => string

  /**
   * This method adds a Metalink download by uploading a ".metalink" file.
   * @example
   * ```ts
   * await aria2.addMetalink(metalink)
   * ```
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#aria2.addMetalink}
   */
  declare addMetalink: (
    metalink: string,
    options?: Partial<Options>,
    position?: number
  ) => string[]

  declare remove: (gid: string) => string

  declare forceRemove: (gid: string) => void

  declare pause: (gid: string) => void

  declare pauseAll: () => void

  declare forcePause: (gid: string) => void

  declare forcePauseAll: () => void

  declare unpause: (gid: string) => void

  declare unpauseAll: () => void

  declare tellStatus: (
    gid: string,
    keys?: string[]
  ) => Partial<TellStatusResult>

  declare getUris: (gid: string) => Uri[]

  declare getFiles: (gid: string) => File[]

  declare getPeers: (gid: string) => Peer[]

  declare getServers: (gid: string) => {
    index: number
    servers: Server[]
  }

  declare tellActive: (keys?: string[]) => TellStatusResult[]

  declare tellWaiting: (
    offset: number,
    num: number,
    keys?: string[]
  ) => TellStatusResult[]

  declare tellStopped: (keys?: string[]) => TellStatusResult[]

  declare changePosition: (
    gid: string,
    pos: number,
    how: 'POS_SET' | 'POS_CUR' | 'POS_END'
  ) => number

  declare changeUri: (
    gid: string,
    fileIndex: string,
    delUris: string[],
    addUris: string[],
    position?: number
  ) => number[]

  declare getOption: (gid: string) => Record<string, unknown>

  declare changeOption: (gid: string, options: Record<string, unknown>) => 'OK'

  declare getGlobalOption: () => Record<string, unknown>

  declare changeGlobalOption: (options: Record<string, unknown>) => 'OK'

  declare getGlobalStat: () => {
    downloadSpeed: number
    uploadSpeed: number
    numActive: number
    numWaiting: number
    numStopped: number
    numStoppedTotal: number
  }

  declare purgeDownloadResult: () => 'OK'

  declare removeDownloadResult: (gid: string) => 'OK'

  declare getVersion: () => {
    version: string
    enabledFeatures: string[]
  }

  declare shutdown: () => 'OK'

  declare forceShutdown: () => 'OK'

  declare saveSession: () => 'OK'
}

type Aria2Methods = keyof Omit<
  Aria2,
  'multicall' | 'listMethods' | 'listNotifications'
>

declare class Aria2System {
  declare multicall: <T extends Aria2Methods = Aria2Methods>(
    methods: {
      methodName: `aria2.${T}`
      params: Parameters<Aria2[T]>
    }[]
  ) => Promise<[ReturnType<Aria2[T]>][]>

  declare listMethods: () => `aria2.${Aria2Methods}`[]

  declare listNotifications: () => `aria2.${Aria2Methods}`[]
}
