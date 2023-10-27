import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { timer } from 'rxjs'
import { filesize } from 'filesize'

import type { File, TellStatusResult } from 'a2c'
import { aria2 } from '~/lib/rpc'

// import '@material/web/button/filled-tonal-button'
import '~/components/fab'

@customElement('a2z-downloads')
export class Downloads extends LitElement {
  render() {
    // console.log(this.active)
    return html`
      ${this.active
        ? this.active.map(
            (result) =>
              html`
                ${result.files?.map((file: File) => html`<p>${file.path.replace(/^.*?([^\\/]*)$/, '$1')}</p>`)}
                <p>
                  ${filesize(result.downloadSpeed, {
                    base: 2,
                    standard: 'jedec',
                  })}/s
                </p>
                <p>
                  ${filesize(result.completedLength, {
                    base: 2,
                    standard: 'jedec',
                  })}
                  /
                  ${filesize(result.totalLength, {
                    base: 2,
                    standard: 'jedec',
                  })}
                </p>
                <progress
                  max=${result.totalLength / 1024}
                  value=${result.completedLength / 1024}
                ></progress>
              `
          )
        : ''}
      <a2z-fab></a2z-fab>
    `
  }

  @property({ attribute: false })
  active: TellStatusResult[] = []

  constructor() {
    super()
    timer(0, 1000).subscribe(
      async () => (this.active = await aria2.tellActive())
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'a2z-downloads': Downloads
  }
}
