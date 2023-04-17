# A2Z [WIP]

A2Z is an experimental Aria2 frontend, currently not working properly.

<div align="center">

**[<kbd> <br> Open in Stackblitz <br> </kbd>](https://stackblitz.com/github/importantimport/a2)** 
**[<kbd> <br> Run in Codeflow <br> </kbd>](https://pr.new/github.com/importantimport/a2)**

</div>

## Development

```bash
pnpm dlx degit importantimport/a2 && cd a2
pnpm install
pnpm dev
```

### Environment

| Name            | Default                         |
| --------------- | ------------------------------- |
| A2Z_RPC_URL     | `http://localhost:6800/jsonrpc` |
| A2Z_RPC_SECRET  | `undefined`                     |
| A2Z_THEME_COLOR | `#6750a4`                       |

### Translation

All current translation files are located in the [`xliff`](xliff) folder, you can also run `pnpm lit localize extract` in the a2z directory to update it.

Recommended to use [Poedit](https://poedit.net/) to edit these files.

## TODO

- Implement most of [yaaw](https://github.com/binux/yaaw)'s features
- Tauri v2 (+ Mobile)
- Implement most of [AriaNg](https://github.com/mayswind/AriaNg)'s features
