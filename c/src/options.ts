import type { InputFileHttpFtpSftpOptions } from './options/http-ftp-sftp'
import type { InputFileHttpSpecificOptions } from './options/http-specific'
import type { InputFileFtpSftpSpecificOptions } from './options/ftp-sftp-specific'
import type { InputFileBittorrentMetalinkOptions } from './options/bittorrent-metalink'
import type { InputFileBittorrentSpecificOptions } from './options/bittorrent-specific'

export type InputFileOptions = Record<string, string> &
  InputFileHttpFtpSftpOptions &
  InputFileHttpSpecificOptions &
  InputFileFtpSftpSpecificOptions &
  InputFileBittorrentMetalinkOptions &
  InputFileBittorrentSpecificOptions
