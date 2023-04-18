import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'

import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/list/list-item-link'

@localized()
@customElement('a2z-settings-index')
export class SettingsIndex extends LitElement {
  render() {
    return html`
      <md-list>
        <md-list-item headline=${msg('RPC Settings')} disabled></md-list-item>
        <md-list-item-link
          headline=${msg('A2Z Settings')}
          href="/settings/a2z"
        ></md-list-item-link>
        <md-list-item headline=${msg('Aria2 Settings')} disabled></md-list-item>
        <md-list-item-link
          headline=${msg('Status')}
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
