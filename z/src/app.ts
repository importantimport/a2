import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Router } from '@lit-labs/router'

import '~/components/nav'

import '~/app.css'

// @ts-ignore: Property 'UrlPattern' does not exist
if (!globalThis.URLPattern) await import('urlpattern-polyfill')

@customElement('a2z-app')
export class App extends LitElement {
  render() {
    return html`
      <main>${this.router.outlet()}</main>
      <a2z-nav .router=${this.router}></a2z-nav>
    `
  }

  static styles = css`
    main {
      background-color: var(--md-sys-color-background);
      color: var(--md-sys-color-on-background);
      min-height: calc(100vh - 80px);
    }
  `

  private router = new Router(
    this,
    [
      {
        path: '/',
        name: 'Index',
        render: () => html`<a2z-index></a2z-index>`,
        enter: async () =>
          await import('./components/index').then((res) =>
            res ? true : false
          ),
      },
      {
        path: '/settings/*',
        name: 'Settings',
        render: () => html`<a2z-settings></a2z-settings>`,
        enter: async () =>
          await import('./pages/settings').then((res) => (res ? true : false)),
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
