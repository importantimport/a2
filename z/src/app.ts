import { LitElement, html } from 'lit'
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
      ${this.router.outlet()}
      <a2z-nav .router=${this.router}></a2z-nav>
    `
  }

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
