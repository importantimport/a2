import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@material/web/fab/fab'
import '@material/web/icon/icon'

@customElement('a2z-fab')
export class Fab extends LitElement {
  render() {
    return html`<md-fab title="Add" variant="primary">
      <md-icon slot="icon">add</md-icon>
    </md-fab>`
  }

  static styles = css`
    md-fab {
      position: fixed;
      z-index: 100;
      bottom: 6em;
      right: 1em;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-fab': Fab
  }
}
