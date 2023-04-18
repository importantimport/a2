import { configureLocalization } from '@lit/localize'
// Generated via output.localeCodesModule
import { sourceLocale, targetLocales } from '~/generated/locales'
import { useHead } from 'unhead'

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => import(`../../generated/locales/${locale}.ts`),
})

export const applyLocale = async (lang: string) => {
  await setLocale(lang)
  useHead({ htmlAttrs: { lang } })
}
