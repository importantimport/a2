import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { localized, msg } from '@lit/localize'
import type { Router } from '@lit-labs/router'

import '@material/web/labs/navigationbar/navigation-bar'
import '@material/web/labs/navigationtab/navigation-tab'
import '@material/web/icon/icon'

/**
 * TODO:
 * - Navigation rail
 *   - @see {@link https://m3.material.io/components/navigation-rail/overview}
 * - Use href directly instead of dirty onclick
 *   - @see {@link https://github.com/material-components/material-web/issues/441}
 * - activeIndex
 */
@localized()
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
          <md-icon slot="active-icon">download</md-icon>
          <md-icon slot="inactive-icon">download</md-icon>
        </md-navigation-tab>
        <md-navigation-tab
          label="History"
        >
          <md-icon slot="active-icon">history</md-icon>
          <md-icon slot="inactive-icon">history</md-icon>
        </md-navigation-tab>
        <md-navigation-tab
          @click=${async () => {
            history.pushState({}, '', '/settings/')
            await this.router?.goto('/settings/')
          }}
          label=${msg('Settings')}
        >
          <md-icon slot="active-icon">settings</md-icon>
          <md-icon slot="inactive-icon">settings</md-icon>
        </md-navigation-tab>
      </md-navigation-bar>
    `
  }

  @property({ attribute: false })
  router?: Router

  static styles = css`
    md-navigation-bar {
      z-index: 100;
      position: fixed;
      left: 0;
      bottom: 0;
    }

    md-icon[slot="active-icon"] {
      --md-icon-font-variation-settings: 'FILL' 1;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-nav': Nav
  }
}
