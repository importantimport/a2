import type { InputFileOptionsKeys } from './shared'

/**
 * FTP/SFTP Specific Options
 * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#ftp-sftp-specific-options}
 */
export type FtpSftpSpecificOptions = {
  /**
   * Set FTP user. This affects all URIs.
   * @defaultValue `anonymous`
   */
  'ftp-user': string
  /**
   * Set FTP password. This affects all URIs.
   * @remarks If user name is embedded but password is missing in URI, aria2 tries to resolve password using .netrc. If password is found in .netrc, then use it as password. If not, use the password specified in this option.
   * @defaultValue `ARIA2USER@`
   */
  'ftp-passwd': string
  /**
   * Use the passive mode in FTP.
   * @remarks If `false` is given, the active mode will be used.
   * @defaultValue `true`
   */
  'ftp-pasv': boolean
  /**
   * Use a proxy server for FTP.
   * @remarks To override a previously defined proxy, use "". See also the `--all-proxy` option. This affects all ftp downloads. The format of PROXY is `[http://][USER:PASSWORD@]HOST[:PORT]`
   */
  'ftp-proxy': string
  /** Set password for `--ftp-proxy` option. */
  'ftp-proxy-password': string
  /** Set user for `--ftp-proxy` option. */
  'ftp-proxy-user': string
  /**
   * Set FTP transfer type. TYPE is either `binary` or `ascii`.
   * @defaultValue `binary` 
   */
  'ftp-type': 'binary' | 'ascii'
  /**
   * Reuse connection in FTP.
   * @defaultValue `true`
   */
  'ftp-reuse-connection': boolean
  /**
   * Set checksum for SSH host public key.
   * @remarks TYPE is hash type. The supported hash type is `sha-1` or `md5`. DIGEST is hex digest. For example: `sha-1=b030503d4de4539dc7885e6f0f5e256704edf4c3`. This option can be used to validate server's public key when SFTP is used. If this option is not set, which is default, no validation takes place.
   */
  'ssh-host-key-md': `${'sha1' | 'md5'}-${string}`
}

export type InputFileFtpSftpSpecificOptions = Omit<
  FtpSftpSpecificOptions,
  keyof Omit<FtpSftpSpecificOptions, InputFileOptionsKeys>
>
