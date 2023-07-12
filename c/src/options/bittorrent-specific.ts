import type { InputFileOptionsKeys, SIZE } from './shared'

/**
 * BitTorrent Specific Options
 * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#bittorrent-specific-options}
 */
export type BittorrentSpecificOptions = {
  /**
   * Exclude seed only downloads when counting concurrent active downloads (See `-j` option).
   * @remarks This means that if `-j3` is given and this option is turned on and 3 downloads are active and one of those enters seed mode, then it is excluded from active download count (thus it becomes 2), and the next download waiting in queue gets started. But be aware that seeding item is still recognized as active download in RPC method.
   * @defaultValue `false`
   */
  'bt-detach-seed-only': boolean
  /**
   * Allow hook command invocation after hash check (see `-V` option) in BitTorrent download.
   * @remarks By default, when hash check succeeds, the command given by `--on-bt-download-complete` is executed. To disable this action, give `false` to this option.
   * @defaultValue `true`
   */
  'bt-enable-hook-after-hash-check': boolean
  /**
   * Enable Local Peer Discovery.
   * @remarks If a private flag is set in a torrent, aria2 doesn't use this feature for that download even if `true` is given.
   * @defaultValue `false`
   */
  'bt-enable-lpd': boolean
  /**
   * Comma separated list of BitTorrent tracker's announce URI to remove.
   * @remarks You can use special value `*` which matches all URIs, thus removes all announce URIs.
   * When specifying `*` in shell command-line, don't forget to escape or quote it. See also `--bt-tracker` option.
   */
  'bt-exclude-tracker': string
  /**
   * Specify the external IP address to use in BitTorrent download and DHT.
   * @remarks It may be sent to BitTorrent tracker. For DHT, this option should be set to report that local node is downloading a particular torrent.
   * This is critical to use DHT in a private network. Although this function is named `external`, it can accept any kind of IP addresses.
   */
  'bt-external-ip': string
  /**
   * Requires BitTorrent message payload encryption with arc4.
   * This is a shorthand of `--bt-require-crypto` `--bt-min-crypto-level`=arc4. This option does not change the option value of those options.
   * If `true` is given, deny legacy BitTorrent handshake and only use Obfuscation handshake and always encrypt message payload.
   * @defaultValue `false`
   */
  'bt-force-encryption': boolean
  /**
   * If `true` is given, after hash check using `--check-integrity` option and file is complete, continue to seed file.
   * @remarks If you want to check file and download it only when it is damaged or incomplete, set this option to `false`. This option has effect only on BitTorrent download.
   * @defaultValue `true`
   */
  'bt-hash-check-seed': boolean
  /**
   * Before getting torrent metadata from DHT when downloading with magnet link, first try to read file saved by `--bt-save-metadata` option.
   * @remarks If it is successful, then skip downloading metadata from DHT.
   * @defaultValue `false`
   */
  'bt-load-saved-metadata': boolean
  /**
   * Use given interface for Local Peer Discovery.
   * @remarks If this option is not specified, the default interface is chosen. You can specify interface name and IP address. Possible Values: interface, IP address
   */
  'bt-lpd-interface': string
  /**
   * Specify maximum number of files to open in multi-file BitTorrent/Metalink download globally.
   * @defaultValue `100`
   */
  'bt-max-open-files': number
  /**
   * Specify the maximum number of peers per torrent.
   * @remarks `0` means unlimited. See also `--bt-request-peer-speed-limit` option.
   * @defaultValue `55`
   */
  'bt-max-peers': number
  /**
   * Download meta data only.
   * @remarks The file(s) described in meta data will not be downloaded. This option has effect only when BitTorrent Magnet URI is used. See also `--bt-save-metadata` option.
   * @defaultValue `false`
   */
  'bt-metadata-only': boolean
  /**
   * Set minimum level of encryption method.
   * @remarks If several encryption methods are provided by a peer, aria2 chooses the lowest one which satisfies the given level.
   * @defaultValue `plain`
   */
  'bt-min-crypto-level': 'plain' | 'arc4'
  /**
   * Try to download first and last pieces of each file first.
   * @remarks This is useful for previewing files. The argument can contain 2 keywords: `head` and `tail`.
   * To include both keywords, they must be separated by comma.
   * These keywords can take one parameter, SIZE.
   * For example, if `head=<SIZE>` is specified, pieces in the range of first SIZE bytes of each file get higher priority.
   * `tail=<SIZE>` means the range of last SIZE bytes of each file. SIZE can include `K` or `M` (1K = 1024, 1M = 1024K). If SIZE is omitted, SIZE=1M is used.
   */
  'bt-prioritize-piece': string
  /**
   * Removes the unselected files when download is completed in BitTorrent.
   * @remarks To select files, use `--select-file` option. If it is not used, all files are assumed to be selected. Please use this option with care because it will actually remove files from your disk.
   * @defaultValue `false`
   */
  'bt-remove-unselected-file': boolean
  /**
   * If `true` is given, aria2 doesn't accept and establish connection with legacy BitTorrent handshake(\19BitTorrent protocol).
   * @remarks Thus aria2 always uses Obfuscation handshake.
   * @defaultValue `false`
   */
  'bt-require-crypto': boolean
  /**
   * If the whole download speed of every torrent is lower than SPEED, aria2 temporarily increases the number of peers to try for more download speed.
   * @remarks Configuring this option with your preferred download speed can increase your download speed in some cases. You can append `K` or `M` (1K = 1024, 1M = 1024K).
   * @defaultValue `50K`
   */
  'bt-request-peer-speed-limit': string
  /**
   * Save meta data as ".torrent" file.
   * @remarks This option has effect only when BitTorrent Magnet URI is used.
   * The file name is hex encoded info hash with suffix ".torrent".
   * The directory to be saved is the same directory where download file is saved.
   * If the same file already exists, meta data is not saved. See also `--bt-metadata-only` option.
   * @defaultValue `false`
   */
  'bt-save-metadata': boolean
  /**
   * Seed previously downloaded files without verifying piece hashes.
   * @defaultValue `false`
   */
  'bt-seed-unverified': boolean
  /**
   * Stop BitTorrent download if download speed is 0 in consecutive SEC seconds.
   * @remarks If `0` is given, this feature is disabled.
   * @defaultValue `0`
   */
  'bt-stop-timeout': number
  /**
   * Comma separated list of additional BitTorrent tracker's announce URI.
   * @remarks These URIs are not affected by `--bt-exclude-tracker` option because they are added after URIs in `--bt-exclude-tracker` option are removed.
   */
  'bt-tracker': string
  /**
   * Set the connect timeout in seconds to establish connection to tracker.
   * @remarks After the connection is established, this option makes no effect and `--bt-tracker-timeout` option is used instead.
   * @defaultValue `60`
   */
  'bt-tracker-connect-timeout': number
  /**
   * Set the interval in seconds between tracker requests.
   * @remarks This completely overrides interval value and aria2 just uses this value and ignores the min interval and interval value in the response of tracker.
   * If `0` is set, aria2 determines interval based on the response of tracker and the download progress.
   * @defaultValue `0`
   */
  'bt-tracker-interval': number
  /**
   * Set timeout in seconds.
   * @defaultValue `60`
   */
  'bt-tracker-timeout': number
  /** Set host and port as an entry point to IPv4 DHT network. */
  'dht-entry-point': string
  /** Set host and port as an entry point to IPv6 DHT network. */
  'dht-entry-point6': string
  /**
   * Change the IPv4 DHT routing table file to PATH.
   * @defaultValue `$HOME/.aria2/dht.dat`
   * @remarks if present, otherwise `$XDG_CACHE_HOME/aria2/dht.dat`.
   */
  'dht-file-path': string
  /**
   * Change the IPv6 DHT routing table file to PATH.
   * @defaultValue `$HOME/.aria2/dht6.dat`
   * @remarks if present, otherwise `$XDG_CACHE_HOME/aria2/dht6.dat`.
   */
  'dht-file-path6': string
  /**
   * Specify address to bind socket for IPv6 DHT.
   * @remarks It should be a global unicast IPv6 address of the host.
   */
  'dht-listen-addr6': string
  /**
   * Set UDP listening port used by DHT(IPv4, IPv6) and UDP tracker.
   * @remarks Multiple ports can be specified by using `,`, for example: `6881,6885`.
   * You can also use `-` to specify a range: `6881-6999`. `,` and `-` can be used together.
   * @defaultValue `6881-6999`
   */
  'dht-listen-port': number | string
  /**
   * Set timeout in seconds.
   * @defaultValue `10`
   */
  'dht-message-timeout': number
  /**
   * Enable IPv4 DHT functionality.
   * @remarks It also enables UDP tracker support. If a private flag is set in a torrent, aria2 doesn't use DHT for that download even if true is given.
   * @defaultValue `true`
   */
  'enable-dht': boolean
  /**
   * Enable IPv6 DHT functionality.
   * @remarks If a private flag is set in a torrent, aria2 doesn't use DHT for that download even if true is given.
   * Use `--dht-listen-port` option to specify port number to listen on. See also `--dht-listen-addr6` option.
   */
  'enable-dht6': boolean
  /**
   * Enable Peer Exchange extension.
   * @remarks If a private flag is set in a torrent, this feature is disabled for that download `even` if true is given.
   * @defaultValue `true`
   */
  'enable-peer-exchange': boolean
  /**
   * If `true` or `mem` is specified,
   * when a file whose suffix is `.torrent` or content type is `application/x-bittorrent` is downloaded,
   * aria2 parses it as a torrent file and downloads files mentioned in it.
   * @remarks If `mem` is specified, a torrent file is not written to the disk, but is just kept in memory.
   * If `false` is specified, the `.torrent` file is downloaded to the disk, but is not parsed as a torrent and its contents are not downloaded.
   * @defaultValue `true`
   */
  'follow-torrent': boolean | 'mem'
  /**
   * Set file path for file with index=INDEX.
   * @remarks You can find the file index using the `--show-files` option.
   * PATH is a relative path to the path specified in `--dir` option.
   * You can use this option multiple times.
   * Using this option, you can specify the output file names of BitTorrent downloads.
   */
  'index-out': string
  /**
   * Set TCP port number for BitTorrent downloads.
   * Multiple ports can be specified by using `,`, for example: `6881,6885`.
   * You can also use `-` to specify a range: `6881-6999`. , and `-` can be used together: `6881-6889,6999`.
   * @defaultValue `6881-6999`
   */
  'listen-port': number | string
  /**
   * Set max overall upload speed in bytes/sec.
   * @remarks `0` means unrestricted. You can append `K` or `M` (1K = 1024, 1M = 1024K).
   * To limit the upload speed per torrent, use `--max-upload-limit` option.
   * @defaultValue `0`
   */
  'max-overall-upload-limit': SIZE
  /**
   * Set max upload speed per each torrent in bytes/sec.
   * @remarks `0` means unrestricted. You can append `K` or `M` (1K = 1024, 1M = 1024K).
   * To limit the overall upload speed, use `--max-overall-upload-limit` option.
   * @defaultValue `0`
   */
  'max-upload-limit': SIZE
  /**
   * Specify the prefix of peer ID.
   * @remarks The peer ID in BitTorrent is 20 byte length.
   * If more than 20 bytes are specified, only first 20 bytes are used.
   * If less than 20 bytes are specified, random byte data are added to make its length 20 bytes.
   * @defaultValue `A2-$MAJOR-$MINOR-$PATCH-`
   * @remarks $MAJOR, $MINOR and $PATCH are replaced by major, minor and patch version number respectively. For instance, aria2 version 1.18.8 has prefix ID `A2-1-18-8-`.
   */
  'peer-id-prefix': string
  /**
   * Specify the string used during the bitorrent extended handshake for the peer's client version.
   * @defaultValue `aria2/$MAJOR.$MINOR.$PATCH`
   * @remarks $MAJOR, $MINOR and $PATCH are replaced by major, minor and patch version number respectively. For instance, aria2 version 1.18.8 has peer agent `aria2/1.18.8`.
   */
  'peer-agent': string
  /**
   * Specify share ratio.
   * @remarks Seed completed torrents until share ratio reaches RATIO.
   * You are strongly encouraged to specify equals or more than `1.0` here.
   * Specify `0.0` if you intend to do seeding regardless of share ratio.
   * If `--seed-time` option is specified along with this option, seeding ends when at least one of the conditions is satisfied.
   * @defaultValue `1.0`
   */
  'seed-ratio': number | string
  /**
   * Specify seeding time in (fractional) minutes.
   * @remarks Also see the `--seed-ratio` option.
   * @remarks Specifying `--seed-time=0` disables seeding after download completed.
   */
  'seed-time': number
  /**
   * The path to the ".torrent" file.
   * @remarks You are not required to use this option because you can specify ".torrent" files without `--torrent-file`.
   */
  'torrent-file': string
}

export type InputFileBittorrentSpecificOptions = Omit<
  BittorrentSpecificOptions,
  keyof Omit<BittorrentSpecificOptions, InputFileOptionsKeys>
>
