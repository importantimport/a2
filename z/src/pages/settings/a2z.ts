import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Task } from '@lit-labs/task'

import '@material/web/icon/icon'
import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/segmentedbutton/outlined-segmented-button'
import '@material/web/segmentedbuttonset/outlined-segmented-button-set'
import '~/components/locale-picker'

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
          <md-outlined-segmented-button-set slot="end">
            <md-outlined-segmented-button label="System">
              <md-icon slot="icon">devices</md-icon>
            </md-outlined-segmented-button>
            <md-outlined-segmented-button label="Light">
              <md-icon slot="icon">light_mode</md-icon>
            </md-outlined-segmented-button>
            <md-outlined-segmented-button label="Dark">
              <md-icon slot="icon">dark_mode</md-icon>
            </md-outlined-segmented-button>
          </md-outlined-segmented-button-set>
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

  themeColorChange({ target: { value } }: { target: HTMLInputElement }) {
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
