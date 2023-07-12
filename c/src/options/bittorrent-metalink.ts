import type { InputFileOptionsKeys } from './shared'

/**
 * BitTorrent/Metalink Options
 * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#bittorrent-metalink-options}
 */
export type BittorrentMetalinkOptions = {
  /**
   * Set file to download by specifying its index.
   * @remarks You can find the file index using the `--show-files` option. Multiple indexes can be specified by using `,`, for example: `3,6`. You can also use `-` to specify a range: `1-5`. `,` and `-` can be used together: `1-5,8,9`. When used with the -M option, index may vary depending on the query (see --metalink-* options).
   */
  'select-file': string
  /**
   * Print file listing of ".torrent", ".meta4" and ".metalink" file and exit.
   * @remarks In case of ".torrent" file, additional information (infohash, piece length, etc) is also printed.
   */
  'show-files': boolean
}

export type InputFileBittorrentMetalinkOptions = Omit<
  BittorrentMetalinkOptions,
  keyof Omit<BittorrentMetalinkOptions, InputFileOptionsKeys>
>
