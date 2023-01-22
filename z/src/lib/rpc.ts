import { createClient } from 'a2c'

export const aria2 = createClient({
  url: import.meta.env.A2Z_RPC_URL ?? 'http://localhost:6800/jsonrpc',
  secret: import.meta.env.A2Z_RPC_SECRET,
})
