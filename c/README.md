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
  secret: '123e4567-e89b-12d3-a456-426614174000', // optional
})

aria2.getVersion().then(console.log) // { enabledFeatures: [], version: '1.36.0' }

// const notify = notify(aria2)
// const [batch, emit, drop] = batch(aria2)
```

`createClient` is a wrapper around `AsyncCall`. So of course you can use it directly if you want:

```ts
import { A2Channel, type Aria2 } from 'a2c'
import { AsyncCall } from 'async-call-rpc'

const aria2 = AsyncCall<Aria2>(
  {},
  {
    channel: new A2Channel({
      url: 'http://localhost:6800/jsonrpc',
      secret: '', // optional
    }),
  }
)
```
