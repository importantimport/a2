import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Task } from '@lit/task'
import { consume } from '@lit/context'

// import '@material/web/divider/divider'
import '@material/web/icon/icon'
import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/labs/segmentedbutton/outlined-segmented-button'
import '@material/web/labs/segmentedbuttonset/outlined-segmented-button-set'
import '@material/web/slider/slider'
import '@material/web/switch/switch'
import '~/pages/settings/a2z/locale-picker'
import '~/pages/settings/a2z/theme-scheme-picker'

import { applyTheme } from '~/lib/utils/apply-theme'
import { type A2ZDatabase, databaseContext } from '~/lib/database'

@customElement('a2z-settings-a2z')
export class SettingsA2Z extends LitElement {
  render() {
    return html`
      <md-list>
        <md-list-item>
          <md-icon data-variant="icon" slot="start">language</md-icon>
          <span slot="headline">Languages</span>
          <a2z-locale-picker slot="end"></a2z-locale-picker>
        </md-list-item>
        <md-list-item>
          <md-icon data-variant="icon" slot="start">palette</md-icon>
          <span slot="headline">Theme Color</span>
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
        <md-list-item>
          <md-icon data-variant="icon" slot="start">auto_mode</md-icon>
          <span slot="headline">Theme Scheme</span>
          <a2z-theme-scheme-picker slot="end"></a2z-theme-scheme-picker>
        </md-list-item>
        <md-list-item>
          <md-icon data-variant="icon" slot="start">autorenew</md-icon>
          <span slot="headline">Auto Refresh</span>
          <div slot="end">
            <md-switch></md-switch>
            <!-- <md-divider></md-divider> -->
            <md-slider
              min="1"
              max="61"
              step="5"
              withLabel="true">
            </md-slider>
          </div>
        </md-list-item>
      </md-list>
    `
  }

  @consume({ context: databaseContext })
  @property({ attribute: false })
  public database?: A2ZDatabase

  private _getThemeColor = new Task(
    this,
    () =>
      this.database?.settings
        .findOne({ selector: { key: 'theme-color' } })
        .exec()
        .then((res) => res?.value),
    () => []
  )

  themeColorChange({ target: { value } }: { target: HTMLInputElement }) {
    this.database?.settings.incrementalUpsert({
      updatedAt: new Date().getTime(),
      key: 'theme-color',
      value,
    })
    applyTheme(value)
    if (import.meta.env.DEV) console.log(value)
  }

  static styles = css`
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-settings-a2z': SettingsA2Z
  }
}
