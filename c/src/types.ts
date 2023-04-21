export type Status =
  | 'active'
  | 'waiting'
  | 'paused'
  | 'error'
  | 'complete'
  | 'removed'

export type Uri = {
  status: Status
  uri: string
}

export type File = {
  index: number
  path: string
  length: number
  completedLength: number
  selected: boolean
  uris: Uri[]
}

export type Peer = {
  peerId: string
  ip: string
  port: number
  bitfield: string
  amChoking: boolean
  peerChoking: boolean
  downloadSpeed: number
  uploadSpeed: number
  seeder: boolean
}

export type Server = {
  uri: string
  currentUri: string
  downloadSpeed: number
}

export type TellStatusResult = {
  gid: string
  status: Status
  totalLength: number
  completedLength: number
  uploadLength: number
  bitfield: string
  downloadSpeed: number
  uploadSpeed: number
  infoHash?: string
  numSeeders?: number
  seeder?: boolean
  pieceLength: number
  numPieces: number
  connections: number
  errorCode?: number
  errorMessage?: string
  followedBy?: string | string[]
  following?: string | string[]
  belongsTo?: string | string[]
  dir: string
  files: File[]
  bittorrent?: {
    announceList?: string[]
    comment?: string
    creationDate?: number
    mode: 'single' | 'multi'
    info?: {
      name: string
    }
  }
  verifiedLength?: number
  verifyIntegrityPending?: true
}
