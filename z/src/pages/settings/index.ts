import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@material/web/list/list'
import '@material/web/list/list-item'

@customElement('a2z-settings-index')
export class SettingsIndex extends LitElement {
  render() {
    return html`
      <md-list>
        <md-list-item headline="RPC Settings"></md-list-item>
        <a href="/settings/a2z">
          <md-list-item headline="A2Z Settings"></md-list-item>
        </a>
        <md-list-item headline="Aria2 Settings"></md-list-item>
        <a href="/settings/status">
          <md-list-item
            headline="Status"
            supportingText="click here!"
          ></md-list-item
        ></a>
      </md-list>
    `
  }

  static styles = css`
    a {
      text-decoration: none;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-settings-index': SettingsIndex
  }
}
