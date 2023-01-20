import { createClient } from 'a2c'

export const server = createClient({
  url: import.meta.env.A2Z_RPC_URL,
  secret: import.meta.env.A2Z_RPC_SECRET,
})
