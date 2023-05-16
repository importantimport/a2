import type { InputFileHttpFtpSftpOptions } from './options/http-ftp-sftp'
import type { InputFileHttpSpecificOptions } from './options/http-specific'

export type InputFileOptions = Record<string, string> &
  InputFileHttpFtpSftpOptions &
  InputFileHttpSpecificOptions
