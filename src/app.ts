import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Router } from '@lit-labs/router'

import 'material-icons/iconfont/filled.css'

import './components/index'
import './components/nav'

@customElement('a2z-app')
export class App extends LitElement {
  private router = new Router(this, [
    { path: '/', name: 'Index', render: () => html`<a2z-index></a2z-index>` },
    {
      path: '/settings',
      name: 'Settings',
      render: () => html`<h1>Settings</h1>`,
    },
  ])

  render() {
    return html`
      <main>${this.router.outlet()}</main>
      <a2z-nav></a2z-nav>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-app': App
  }
}
