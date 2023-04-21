import type { EventBasedChannel } from 'async-call-rpc'
import type { Aria2 } from './index'

export type A2ChannelOptions = {
  url: string
  user?: string
  secret?: string
  method?: 'POST' | 'GET'
}

export type Data<T extends keyof Aria2 = keyof Aria2> = {
  id: string
  jsonrpc: '2.0'
  method?: T
  params?: Parameters<Aria2[T]>
  result?: unknown
}

const secret = ({
  method,
  user,
  secret,
}: Pick<A2ChannelOptions, 'user' | 'secret'> & Pick<Data, 'method'>) =>
  !['listMethods', 'listNotifications'].includes(method) && secret
    ? [user ?? 'token', secret].join(':')
    : undefined

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
            params:
              data.method === 'multicall'
                ? (data as Data<'multicall'>).params.map((param) =>
                    param.map(({ methodName, params }) => ({
                      methodName,
                      params: [
                        secret({
                          method: data.method,
                          user: this.options.user,
                          secret: this.options.secret,
                        }),
                        ...params,
                      ],
                    }))
                  )
                : [
                    secret({
                      method: data.method,
                      user: this.options.user,
                      secret: this.options.secret,
                    }),
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
