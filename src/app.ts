import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Router } from '@lit-labs/router'

import 'material-icons/iconfont/filled.css'

import './components/nav'

// @ts-ignore: Property 'UrlPattern' does not exist 
if (!globalThis.URLPattern) await import('urlpattern-polyfill')

@customElement('a2z-app')
export class App extends LitElement {
  render() {
    return html`
      <main>${this.router.outlet()}</main>
      <a2z-nav></a2z-nav>
    `
  }

  private router = new Router(
    this,
    [
      {
        path: '/',
        name: 'Index',
        render: () => html`<a2z-index></a2z-index>`,
        enter: async () => {
          await import('./components/index')
          return true
        },
      },
      {
        path: '/settings',
        name: 'Settings',
        render: () => html`<h1>Settings</h1>`,
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
