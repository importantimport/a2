import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@material/web/list/list'
import '@material/web/list/list-item'

@customElement('a2z-settings-a2z')
export class SettingsA2Z extends LitElement {
  render() {
    return html`
      <md-list>
        <md-list-item headline="Languages"></md-list-item>
        <md-list-item headline="Dark Mode"></md-list-item>
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
    'a2z-settings-a2z': SettingsA2Z
  }
}
