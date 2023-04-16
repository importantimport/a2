import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Router } from '@lit-labs/router'

@customElement('a2z-settings')
export class Settings extends LitElement {
  render() {
    return html`${this.router.outlet()} `
  }

  private router = new Router(this, [
    {
      path: '/*',
      name: 'Index',
      render: () => html`<a2z-settings-index></a2z-settings-index>`,
      enter: async () =>
        await import('./settings/index').then((res) => (res ? true : false)),
    },
    {
      path: 'a2z',
      name: 'A2Z',
      render: () => html`<a2z-settings-a2z></a2z-settings-a2z>`,
      enter: async () =>
        await import('./settings/a2z').then((res) => (res ? true : false)),
    },
    {
      path: 'status',
      name: 'Status',
      render: () => html`<a2z-settings-status></a2z-settings-status>`,
      enter: async () =>
        await import('./settings/status').then((res) => (res ? true : false)),
    },
  ])
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-settings': Settings
  }
}
