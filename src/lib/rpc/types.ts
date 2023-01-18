/**
 * Aria2 JSON-RPC Methods type definition for Async Call RPC
 * @remarks version 1.36.0
 * @see {@link http://aria2.github.io/manual/en/html/aria2c.html#methods}
 */
export declare class Aria2 {
  declare addUri: (uris: string[], options?: string, position?: number) => void

  declare addTorrent: (
    torrent: string,
    uris?: string[],
    options?: string,
    position?: number
  ) => void

  declare addMetalink: (
    metalink: string,
    options?: string,
    position?: number
  ) => void

  declare getVersion: () => {
    version: string
    enabledFeatures: string[]
  }
}

export default Aria2
