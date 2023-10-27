import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { aria2 } from '~/lib/rpc'

import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/divider/divider'

const { version, enabledFeatures } = await aria2.getVersion()

@customElement('a2z-settings-status')
export class SettingsStatus extends LitElement {
  render() {
    return html`
      <md-list>
        <md-list-item>
          <span slot="headline">Address</span>
          <span slot="trailing-supporting-text">${import.meta.env.A2Z_RPC_URL ?? 'http://localhost:6800/jsonrpc'}</span>
        </md-list-item>
        <md-list-item>
          <span slot="headline">Version</span>
          <span slot="trailing-supporting-text">${version}</span>
        </md-list-item>
        <md-divider></md-divider>
        <md-list-item disabled>
          <span slot="supporting-text">Enabled features</span>
        </md-list-item>
        ${enabledFeatures.map(
          (feature) => html`<md-list-item>
            <span slot="headline">${feature}</span>
          </md-list-item>`
        )}
      </md-list>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-settings-status': SettingsStatus
  }
}
