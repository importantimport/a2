import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { localized } from '@lit/localize'

import { allLocales } from '~/generated/locales'
import { applyLocale, getLocale } from '~/lib/utils/locales'

import { db } from '~/lib/database'

const localeNames: {
  [L in typeof allLocales[number]]: string
} = {
  en: 'English',
  zh_CN: '简体中文',
  zh_TW: '正體中文',
  ja_JP: '日本语',
}

const database = await db()
console.log(getLocale())

@localized()
@customElement('a2z-locale-picker')
export class LocalePicker extends LitElement {
  render() {
    return html`
      <select @change=${this.localeChanged} slot=${this.slot}>
        ${allLocales.map(
          (locale) => html`
            <option value=${locale} ?selected=${locale === getLocale()}>
              ${localeNames[locale]}
            </option>
          `
        )}
      </select>
    `
  }

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
