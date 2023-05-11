# A2C

Aria2 JSON-RPC client with full type definition.

## Install

A2C requires [`async-call-rpc`](https://github.com/Jack-Works/async-call-rpc), so you should install them both.

```bash
pnpm add a2c async-call-rpc # pnpm
# yarn add a2c async-call-rpc # yarn
# npm i a2c async-call-rpc # npm
```

## Usage

```ts
import { createClient } from 'a2c'
// import { notify, batch } from 'async-call-rpc'

const aria2 = createClient({
  url: 'http://localhost:6800/jsonrpc', // defaultValue
  secret: '123e4567-e89b-12d3-a456-426614174000', // --rpc-secret, optional
})

await aria2.getVersion().then(console.log) // { enabledFeatures: [], version: '1.36.0' }

// const notify = notify(createClient())
// const [batch, emit, drop] = batch(createClient())
```

If you use user/passwd instead of secret:

```ts
import { createClient } from 'a2c'

const aria2 = createClient({
  url: 'http://localhost:6800/jsonrpc', // defaultValue
  user: 'username', // --rpc-user
  secret: 'password', // --rpc-passwd
})
```

### Advanced

`createClient` is a wrapper around `AsyncCall`. So of course you can use it directly if you want:

```ts
import { A2Channel, type Aria2 } from 'a2c'
import { AsyncCall } from 'async-call-rpc'

const aria2 = AsyncCall<Aria2>(
  {},
  {
    channel: new A2Channel({
      url: 'http://localhost:6800/jsonrpc', // defaultValue
      secret: '', // --rpc-secret, optional
    }),
  }
)
```

A2Channel uses the [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) in the runtime environment.

But for some custom use cases, you can also implement your own [EventBasedChannel](https://github.com/Jack-Works/async-call-rpc#the-first-concept-channel) and reuse the A2C type definition:

```ts
import type { Aria2 } from 'a2c'
import { type EventBasedChannel, AsyncCall } from 'async-call-rpc'

class MyChannel implements EventBasedChannel {
  on(listener: (data: unknown) => void) {
    ...
  }
  send(data: unknown): void {
    ...
  }
}

const aria2 = AsyncCall<Aria2>(
  {},
  { channel: new MyChannel() }
)
```
