import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@material/web/list/list'
import '@material/web/list/list-item'
// import '@material/web/select/filled-select'
// import '@material/web/select/select-option'

import { db } from '~/lib/database'

@customElement('a2z-settings-a2z')
export class SettingsA2Z extends LitElement {
  render() {
    return html`
      <md-list>
        <md-list-item headline="Languages">
          <!-- <md-filled-select slot="end">
            <md-select-option value="english" selected>English</md-select-option>
            <md-select-option value="japanese">Japanese</md-select-option>
            <md-select-option value="chinese">Chinese</md-select-option>
          </md-filled-select> -->
        </md-list-item>
        <md-list-item headline="Theme Color">
          <input
            type="color"
            value="#6750a4"
            slot="end"
            @change=${this.themeColorChange}
          />
        </md-list-item>
        <md-list-item headline="Dark Mode">
          <!-- <md-filled-select slot="end">
            <md-select-option value="device" selected>devices</md-select-option>
            <md-select-option value="light">wb_sunny</md-select-option>
            <md-select-option value="dark">nightlight</md-select-option>
          </md-filled-select> -->
        </md-list-item>
      </md-list>
    `
  }

  async themeColorChange({ target: { value } }: { target: HTMLInputElement }) {
    (await db()).settings.incrementalUpsert({
      updatedAt: new Date().getTime(),
      key: 'theme-color',
      value,
    })
    if (import.meta.env.DEV) console.log(value)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-settings-a2z': SettingsA2Z
  }
}
