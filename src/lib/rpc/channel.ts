import type { EventBasedChannel } from 'async-call-rpc'

export class A2ZChannel extends EventTarget implements EventBasedChannel {
  on(listener: (data: unknown) => void) {
    const callback = (e: Event): void => listener((e as MessageEvent).data)
    this.addEventListener('message', callback)
    return () => this.removeEventListener('message', callback)
  }

  async send(data: {
    id: string
    jsonrpc: '2.0'
    method: string
    params: unknown[]
  }): Promise<void> {
    this.dispatchEvent(
      new MessageEvent('message', {
        data: await fetch(
          import.meta.env.A2Z_RPC_URL ?? 'http://localhost:6800/jsonrpc',
          {
            method: 'POST',
            body: JSON.stringify({
              ...data,
              method: `aria2.${data.method}`,
              params: [
                ...(import.meta.env.A2Z_RPC_SECRET
                  ? [`token:${import.meta.env.A2Z_RPC_SECRET}`]
                  : []),
                ...data.params,
              ],
            }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        ).then((res) => res.json()),
      })
    )
  }
}
