import { configureLocalization } from '@lit/localize'
// Generated via output.localeCodesModule
import { sourceLocale, targetLocales } from '~/generated/locales'
import { useHead } from 'unhead'


export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => import(`../../generated/locales/${locale}`),
})

export const applyLocale = async (locale: string) => {
  await setLocale(locale)
  useHead({
    htmlAttrs: {
      lang: locale
    }
  })
}