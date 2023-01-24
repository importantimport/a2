import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { aria2 } from '../../lib/rpc'

import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/list/list-divider'

const { version, enabledFeatures } = await aria2.getVersion()

@customElement('a2z-settings-status')
export class SettingsStatus extends LitElement {
  render() {
    return html`
      <md-list>
        <md-list-item
          headline="Address"
          trailingSupportingText=${import.meta.env.A2Z_RPC_URL ?? 'http://localhost:6800/jsonrpc'}
        ></md-list-item>
        <md-list-item
          headline="Version"
          trailingSupportingText=${version}
        ></md-list-item>
        <md-list-divider></md-list-divider>
        <md-list-item supportingText="Enabled features" disabled></md-list-item>
        ${enabledFeatures.map(
          (feature) => html`<md-list-item headline=${feature}></md-list-item>`
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
