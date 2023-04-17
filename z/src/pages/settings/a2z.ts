import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Task } from '@lit-labs/task'

import '@material/web/list/list'
import '@material/web/list/list-item'
import '~/components/locale-picker'
// import '@material/web/select/filled-select'
// import '@material/web/select/select-option'

import { db } from '~/lib/database'
import { applyTheme } from '~/lib/utils/apply-theme'

const database = await db()

@customElement('a2z-settings-a2z')
export class SettingsA2Z extends LitElement {
  render() {
    return html`
      <md-list>
        <md-list-item headline="Languages">
          <a2z-locale-picker slot="end"></a2z-locale-picker>
        </md-list-item>
        <md-list-item headline="Theme Color">
          ${this._getThemeColor.render({
            complete: (value) => html`
              <input
                type="color"
                value=${value ?? '#6750a4'}
                slot="end"
                @change=${this.themeColorChange}
              />
            `,
          })}
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

  private _getThemeColor = new Task(
    this,
    () =>
      database.settings
        .findOne({ selector: { key: 'theme-color' } })
        .exec()
        .then((res) => res?.value),
    () => []
  )

  themeColorChange({
    target: { value },
  }: {
    target: HTMLInputElement
  }) {
    database.settings.incrementalUpsert({
      updatedAt: new Date().getTime(),
      key: 'theme-color',
      value,
    })
    applyTheme(value)
    if (import.meta.env.DEV) console.log(value)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-settings-a2z': SettingsA2Z
  }
}
