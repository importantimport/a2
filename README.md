# A2

A JSON-RPC client and experimental frontend for Aria 2.

## [A2C](c)

Lightweight Aria2 JSON-RPC client with full type definition.

```ts
import { createClient } from 'a2c'

const aria2 = createClient({
  url: 'http://localhost:6800/jsonrpc', // defaultValue
  secret: '123e4567-e89b-12d3-a456-426614174000', // optional
})

await aria2.getVersion().then(console.log) // { enabledFeatures: [], version: '1.36.0' }
```

## [A2Z](z)

Experimental Aria2 frontend, currently not working properly.

```bash
pnpm dlx degit importantimport/a2 && cd a2
pnpm install
pnpm dev
```

### 2023-09 A2Z Status

Waiting [Button app bar](https://m3.material.io/components/bottom-app-bar/overview) and [Navigaton rail](https://m3.material.io/components/navigation-rail/overview)

- [@material/web](https://github.com/material-components/material-web)
  - [Roadmap](https://github.com/material-components/material-web/blob/main/docs/roadmap.md)
- [@maicol07/material-web-additions](https://github.com/maicol07/material-web-additions)
