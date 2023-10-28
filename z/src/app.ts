import { LitElement, html } from 'lit'
import { until } from 'lit/directives/until.js'
import { customElement, property } from 'lit/decorators.js'
import { Router } from '@lit-labs/router'
import { provide } from '@lit/context'
import { createHead } from 'unhead'

import { database, databaseContext } from '~/lib/database'
import { applyTheme } from '~/lib/utils/apply-theme'
import { applyLocale } from '~/lib/utils/locales'

import '~/components/nav'

import '~/styles/index.css'

const db = await database()

@customElement('a2z-app')
export class App extends LitElement {
  render() {
    return html`
      ${this.router.outlet()}
      <a2z-nav .router=${this.router}></a2z-nav>
    `
  }

  @provide({ context: databaseContext })
  database = db

  @property({ attribute: false })
  accessor head: unknown = createHead()

  connectedCallback() {
    super.connectedCallback()
    until(this._applyTheme())
    until(this._applyLocale())
  }

  async _applyTheme() {
    applyTheme(
      await this.database.settings
        .findOne({ selector: { key: 'theme-color' } })
        .exec()
        .then((res) => res?.value)
    )
  }

  async _applyLocale() {
    const locale = await this.database.settings
      .findOne({ selector: { key: 'language' } })
      .exec()
      .then((res) => res?.value)
    if (locale) applyLocale(locale)
  }

  private router = new Router(
    this,
    [
      {
        path: '/',
        name: 'Index',
        render: () => html`<a2z-downloads></a2z-downloads>`,
        enter: async () =>
          await import('./pages/index').then((res) => !!res),
      },
      {
        path: '/settings/*',
        name: 'Settings',
        render: () => html`<a2z-settings></a2z-settings>`,
        enter: async () =>
          await import('./pages/settings').then((res) => !!res),
      },
    ],
    {
      fallback: {
        name: '404',
        render: () => html`<h1>404 Not Found</h1>`,
      },
    }
  )
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-app': App
  }
}
