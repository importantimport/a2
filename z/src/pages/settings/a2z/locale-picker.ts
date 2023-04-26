import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { localized } from '@lit/localize'

import { allLocales } from '~/generated/locales'
import { applyLocale, getLocale } from '~/lib/utils/locales'

import { db } from '~/lib/database'

import '@material/web/select/filled-select'
import '@material/web/select/select-option'

const localeNames: {
  [L in (typeof allLocales)[number]]: string
} = {
  en: 'English',
  'ja-JP': '日本語',
  'zh-Hans': '简体中文',
  'zh-Hant': '正體中文',
}

const database = await db()

@localized()
@customElement('a2z-locale-picker')
export class LocalePicker extends LitElement {
  render() {
    return html`
      <select @change=${this.localeChanged} slot=${this.slot}>
        ${allLocales.map(
          (locale) => html`
            <option value=${locale} ?selected=${locale === getLocale()}>
              ${localeNames[locale]} (${locale})
            </option>
          `
        )}
      </select>
    `
  }

  // render() {
  //   return html`
  //     <md-filled-select @change=${this.localeChanged} slot=${this.slot}>
  //       ${allLocales.map(
  //         (locale) => html`
  //           <md-select-option
  //             value=${locale}
  //             headline=${`${localeNames[locale]} (${locale})`}
  //             ?selected=${locale === getLocale()}
  //           ></md-select-option>
  //         `
  //       )}
  //     </md-filled-select>
  //   `
  // }

  @property({ type: String })
  slot = 'end'

  async localeChanged({ target: { value } }: { target: HTMLSelectElement }) {
    if (value !== getLocale()) {
      await applyLocale(value)
      database.settings.incrementalUpsert({
        updatedAt: new Date().getTime(),
        key: 'language',
        value,
      })
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-locale-picker': LocalePicker
  }
}
