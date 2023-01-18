import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { msg } from '@lit/localize'

import '@material/web/navigationbar/navigation-bar'
import '@material/web/navigationtab/navigation-tab'
import '@material/web/icon/icon'

/**
 * TODO: md-navigation-rail
 * @see {@link https://m3.material.io/components/navigation-rail/overview}
 */
@customElement('a2z-nav')
export class Nav extends LitElement {
  render() {
    return html`
      <md-navigation-bar hideInactiveLabels>
        <md-navigation-tab label=${msg('Downloads')}>
          <md-icon slot="activeIcon">downloads</md-icon>
          <md-icon slot="inactiveIcon">downloads</md-icon>
        </md-navigation-tab>
        <md-navigation-tab label=${msg('Settings')}>
          <md-icon slot="activeIcon">settings</md-icon>
          <md-icon slot="inactiveIcon">settings</md-icon>
        </md-navigation-tab>
      </md-navigation-bar>
    `
  }

  static styles = css`
    md-navigation-bar {
      position: fixed;
      bottom: 0;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-nav': Nav
  }
}
