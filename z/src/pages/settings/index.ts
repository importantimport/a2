import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'

import '@material/web/icon/icon'
import '@material/web/list/list'
import '@material/web/list/list-item'
// import '@material/web/list/list-item-link'

@localized()
@customElement('a2z-settings-index')
export class SettingsIndex extends LitElement {
  render() {
    return html`
      <md-list>
        <md-list-item headline=${msg('RPC Settings')} disabled>
          <md-icon data-variant="icon" slot="start">manage_accounts</md-icon>
        </md-list-item>
        <md-list-item
          type="link"
          headline=${msg('A2Z Settings')}
          supportingText="Languages, Theme color, Dark mode"
          href="/settings/a2z"
        >
          <md-icon data-variant="icon" slot="start">display_settings</md-icon>
        </md-list-item>
        <md-list-item headline=${msg('Aria2 Settings')} disabled>
          <md-icon data-variant="icon" slot="start">tune</md-icon>
        </md-list-item>
        <md-list-item
          type="link"
          headline=${msg('Status')}
          supportingText="Version, Enabled features"
          href="/settings/status"
        >
          <md-icon data-variant="icon" slot="start">info</md-icon>
        </md-list-item>
      </md-list>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-settings-index': SettingsIndex
  }
}
