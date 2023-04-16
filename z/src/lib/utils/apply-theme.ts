import {
  applyTheme as materialApplyTheme,
  themeFromSourceColor,
  argbFromHex,
} from '@material/material-color-utilities'

export const applyTheme = (hex?: string) =>
  materialApplyTheme(themeFromSourceColor(argbFromHex(hex ?? '#6750a4')), {
    // https://github.com/material-components/material-web/issues/4145
    // dark: window.matchMedia('(prefers-color-scheme: dark)').matches
    //   ? true
    //   : false,
    dark: false
  })
