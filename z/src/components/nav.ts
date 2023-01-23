import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { msg } from '@lit/localize'
import type { Router } from '@lit-labs/router'

import '@material/web/navigationbar/navigation-bar'
import '@material/web/navigationtab/navigation-tab'
import '@material/web/icon/icon'

/**
 * TODO:
 * - Inactive outline icon (Material Symbols?)
 * - Navigation rail
 *   - @see {@link https://m3.material.io/components/navigation-rail/overview}
 * - Use href directly instead of dirty onclick
 *   - @see {@link https://github.com/material-components/material-web/issues/441}
 */
@customElement('a2z-nav')
export class Nav extends LitElement {
  render() {
    return html`
      <md-navigation-bar hideInactiveLabels>
        <md-navigation-tab
          @click=${async () => {
            history.pushState({}, '', '/')
            await this.router?.goto('/')
          }}
          label=${msg('Downloads')}
        >
          <md-icon slot="activeIcon">downloads</md-icon>
          <md-icon slot="inactiveIcon">downloads</md-icon>
        </md-navigation-tab>
        <md-navigation-tab
          @click=${async () => {
            history.pushState({}, '', '/settings/')
            await this.router?.goto('/settings/')
          }}
          label=${msg('Settings')}
        >
          <md-icon slot="activeIcon">settings</md-icon>
          <md-icon slot="inactiveIcon">settings</md-icon>
        </md-navigation-tab>
      </md-navigation-bar>
    `
  }

  @property({ attribute: false })
  router?: Router

  static styles = css`
    md-navigation-bar {
      position: fixed;
      left: 0;
      bottom: 0;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-nav': Nav
  }
}
