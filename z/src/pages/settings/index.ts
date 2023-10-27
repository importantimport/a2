import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'

import '@material/web/icon/icon'
import '@material/web/list/list'
import '@material/web/list/list-item'

@localized()
@customElement('a2z-settings-index')
export class SettingsIndex extends LitElement {
  render() {
    return html`
      <md-list>
        <md-list-item disabled>
          <md-icon data-variant="icon" slot="start">manage_accounts</md-icon>
          <span slot="headline">${msg('RPC Settings')}</span>
        </md-list-item>
        <md-list-item
          type="link"
          href="/settings/a2z"
        >
          <md-icon data-variant="icon" slot="start">display_settings</md-icon>
          <span slot="headline">${msg('A2Z Settings')}</span>
          <span slot="supporting-text">Languages, Theme color, Dark mode</span>
        </md-list-item>
        <md-list-item disabled>
          <md-icon data-variant="icon" slot="start">tune</md-icon>
          <span slot="headline">${msg('Aria2 Settings')}</span>
        </md-list-item>
        <md-list-item
          type="link"
          href="/settings/status"
        >
          <md-icon data-variant="icon" slot="start">info</md-icon>
          <span slot="headline">${msg('Status')}</span>
          <span slot="supporting-text">Version, Enabled features</span>
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
