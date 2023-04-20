import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { localized } from '@lit/localize'

// import { db } from '~/lib/database'

// const database = await db()

@localized()
@customElement('a2z-theme-scheme-picker')
export class ThemeSchemePicker extends LitElement {
  render() {
    return html`
      <md-outlined-segmented-button-set slot=${this.slot}>
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
    `
  }

  @property({ type: String })
  slot = 'end'
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-theme-scheme-picker': ThemeSchemePicker
  }
}
