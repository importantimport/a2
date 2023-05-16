import type { SIZE, InputFileOptions } from './shared'

/**
 * HTTP/FTP/SFTP Options
 * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#http-ftp-sftp-options}
 */
type HttpFtpSftpOptionsRaw = {
  /**
   * Use a proxy server for all protocols.
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-all-proxy}
   */
  'all-proxy': string
  /**
   * Set password for `all-proxy` option.
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-all-proxy-passwd}
   */
  'all-proxy-passwd': string
  /**
   * Set user for `all-proxy` option.
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-all-proxy-user}
   */
  'all-proxy-user': string
  /**
   * Set checksum.
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-checksum}
   */
  checksum: string
  /**
   * Set the connect timeout in seconds to establish connection to HTTP/FTP/proxy server.
   * @defaultValue `60`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-connect-timeout}
   */
  'connect-timeout': number
  /**
   * If `true` is given, aria2 just checks whether the remote file is available and doesn't download data.
   * @defaultValue `false`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-dry-run}
   */
  'dry-run': boolean
  /**
   * Close connection if download speed is lower than or equal to this value(bytes per sec).
   * @defaultValue `0`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-lowest-speed-limit}
   */
  'lowest-speed-limit': SIZE
  /**
   * The maximum number of connections to one server for each download.
   * @defaultValue `1`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-x}
   */
  'max-connection-per-server': number

  'max-file-not-found': number

  'max-tries': number

  'min-split-size': SIZE
  /**
   * Specify the path to the netrc file.
   * @defaultValue `$(HOME)/.netrc`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-netrc-path}
   */
  'netrc-path': string
  /**
   * Disables netrc support. netrc support is enabled by default.
   * @defaultValue `false`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-n}
   */
  'no-netrc': boolean
  /**
   * Specify a comma separated list of host names, domains and network addresses with or without a subnet mask where no proxy should be used.
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-no-proxy}
   */
  'no-proxy': string
  /**
   * The file name of the downloaded file.
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-o}
   */
  out: string
  /**
   * Set the method to use in proxy request.
   * @defaultValue `get`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-proxy-method}
   */
  'proxy-method': 'get' | 'tunnel'
  /**
   * Retrieve timestamp of the remote file from the remote HTTP/FTP server and if it is available, apply it to the local file.
   * @defaultValue `false`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-R}
   */
  'remote-time': boolean
  /**
   * Reuse already used URIs if no unused URIs are left.
   * @defaultValue `true`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-reuse-uri}
   */
  'reuse-uri': boolean
  /**
   * Set the seconds to wait between retries.
   * @defaultValue `0`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-retry-wait}
   */
  'retry-wait': number
  /**
   * Specify the file name to which performance profile of the servers is saved.
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-server-stat-of}
   */
  'server-stat-of': string
  /**
   * Specify the file name to load performance profile of the servers.
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-server-stat-if}
   */
  'server-stat-if': string
  /**
   * Specifies timeout in seconds to invalidate performance profile of the servers since the last contact to them.
   * @defaultValue `86400`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-server-stat-timeout}
   */
  'server-stat-timeout': number
  /**
   * Download a file using N connections.
   * @defaultValue `5`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-s}
   */
  split: number
  /**
   * Specify piece selection algorithm used in HTTP/FTP download.
   * @defaultValue `default`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-stream-piece-selector}
   */
  'stream-piece-selector': 'default' | 'inorder' | 'random' | 'geom'
  /**
   * Set timeout in seconds.
   * @defaultValue `60`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-t}
   */
  timeout: number
  /**
   * Specify URI selection algorithm.
   * @defaultValue `feedback`
   * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-uri-selector}
   */
  'uri-selector': 'inorder' | 'feedback' | 'adaptive'
}

export type HttpFtpSftpOptions = Omit<HttpFtpSftpOptionsRaw, keyof Omit<HttpFtpSftpOptionsRaw, InputFileOptions>>
