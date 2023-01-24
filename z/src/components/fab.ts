import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@material/web/fab/fab'

@customElement('a2z-fab')
export class Fab extends LitElement {
  render() {
    return html`<md-fab title="Add" icon="add"></md-fab>`
  }

  static styles = css`
    md-fab {
      --md-fab-container-color: var(--md-sys-color-primary-container);
      --md-fab-icon-color: var(--md-sys-color-on-primary-container);
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
