import {
  applyTheme as materialApplyTheme,
  themeFromSourceColor,
  argbFromHex,
  hexFromArgb,
} from '@material/material-color-utilities'
import { useHead } from 'unhead'

export const applyTheme = (hex?: string) => {
  const theme = themeFromSourceColor(argbFromHex(hex ?? import.meta.env.A2Z_THEME_COLOR ?? '#6750a4'))
  materialApplyTheme(theme, {
    // https://github.com/material-components/material-web/issues/4145
    // dark: window.matchMedia('(prefers-color-scheme: dark)').matches
    //   ? true
    //   : false,
    dark: false,
  })
  useHead({
    meta: [
      // {
      //   name: 'theme-color',
      //   media: '(prefers-color-scheme: light)',
      //   content: hexFromArgb(theme.schemes.light.surface)
      // },
      // {
      //   name: 'theme-color',
      //   media: '(prefers-color-scheme: dark)',
      //   content: hexFromArgb(theme.schemes.dark.surface)
      // },
      {
        name: 'theme-color',
        content: hexFromArgb(theme.schemes.light.surface),
      },
    ],
  })
}
