import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { msg, str } from '@lit/localize'

import { Subject } from 'rxjs'
import { throttleTime } from 'rxjs/operators'

import '@material/web/button/tonal-button'
import '~/components/fab'

import { aria2 } from '~/lib/rpc'

const { version } = await aria2.getVersion()

@customElement('a2z-index')
export class Index extends LitElement {
  render() {
    return html`
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src="/lit.svg" class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <h1>
        ${msg(str`Vite + ${this.name}`, {
          desc: 'Vite + Lit',
        })}
        <small>${version}</small>
      </h1>
      <div class="card">
        <md-tonal-button
          label="count is ${this.count}"
          @click=${() => this.counter$.next(this.count + 1)}
          part="button"
        >
        </md-tonal-button>
      </div>
      <a2z-fab></a2z-fab>
    `
  }

  @property({ type: String })
  name = 'Lit'

  @state()
  count = 0

  constructor() {
    super()
    this.counter$
      .pipe(throttleTime(1000))
      .subscribe((count) => (this.count = count))
  }

  private counter$ = new Subject<number>()

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    h1 {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-index': Index
  }
}
