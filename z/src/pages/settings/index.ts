import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/list/list-item-link'

@customElement('a2z-settings-index')
export class SettingsIndex extends LitElement {
  render() {
    return html`
      <md-list>
        <md-list-item headline="RPC Settings" disabled></md-list-item>
        <md-list-item-link
          headline="A2Z Settings"
          href="/settings/a2z"
        ></md-list-item-link>
        <md-list-item headline="Aria2 Settings" disabled></md-list-item>
        <md-list-item-link
          headline="Status"
          supportingText="click here!"
          href="/settings/status"
        ></md-list-item-link>
      </md-list>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-settings-index': SettingsIndex
  }
}
