import type { EventBasedChannel } from 'async-call-rpc'

export type A2ChannelOptions = {
  url: string
  user?: string
  secret?: string
  method?: 'POST' | 'GET'
}

export class A2Channel extends EventTarget implements EventBasedChannel {
  constructor(
    private options: A2ChannelOptions = {
      url: 'http://localhost:6800/jsonrpc',
    }
  ) {
    super()
  }

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
        data: await fetch(this.options.url, {
          method: this.options.method ?? 'POST',
          body: JSON.stringify({
            ...data,
            method: `aria2.${data.method}`,
            params: [
              ...(this.options.secret ? [
                [
                  this.options.user ?? 'token',
                  this.options.secret
                ].join(':')
              ] : []),
              ...data.params,
            ],
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .catch(console.error),
      })
    )
  }
}
