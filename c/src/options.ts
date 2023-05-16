import type { HttpFtpSftpOptions } from './options/http-ftp-sftp'
import type { HttpSpecificOptions } from './options/http-specific'

export type Options = Record<string, string> & HttpFtpSftpOptions & HttpSpecificOptions
