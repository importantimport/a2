import type { EventBasedChannel } from 'async-call-rpc'

export type A2ChannelOptions = {
  url: string
  user?: string
  secret?: string
  method?: 'POST' | 'GET'
}

export type Data = {
  id: string
  jsonrpc: '2.0'
  method?: string
  params?: unknown[]
  result?: unknown
}

export class A2Channel extends EventTarget implements EventBasedChannel<Data> {
  constructor(
    private options: A2ChannelOptions = {
      url: 'http://localhost:6800/jsonrpc',
    }
  ) {
    super()
  }

  on(listener: (data: Data) => void) {
    const callback = ({ data }: MessageEvent<Data>) => listener(data)
    this.addEventListener('message', callback)
    return () => this.removeEventListener('message', callback)
  }

  async send(data: Data): Promise<void> {
    this.dispatchEvent(
      new MessageEvent('message', {
        data: await fetch(this.options.url, {
          method: this.options.method ?? 'POST',
          body: JSON.stringify({
            ...data,
            method: [
              ['multicall', 'listMethods', 'listNotifications'].includes(
                data.method
              )
                ? 'system'
                : 'aria2',
              data.method,
            ].join('.'),
            params: [
              ...(this.options.secret
                ? [
                    [this.options.user ?? 'token', this.options.secret].join(
                      ':'
                    ),
                  ]
                : []),
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
