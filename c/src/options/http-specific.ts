import type { InputFileOptions } from "./shared"

/**
 * HTTP Specific Options
 * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#http-specific-options}
 */
type HttpSpecificOptionsRaw = {
  'ca-certificate': string

  'certificate': string

  'check-certificate': boolean

  'http-accept-gzip': boolean

  'http-auth-challenge': boolean

  'http-no-cache': boolean

  'http-user': string

  'http-passwd': string

  'http-proxy': string

  'http-proxy-passwd': string

  'http-proxy-user': string

  'private-key': string

  'referer': string

  'enable-http-keep-alive': boolean

  'enable-http-pipelining': boolean

  'header': string

  'load-cookies': string

  'save-cookies': string

  'use-head': boolean

  'user-agent': string
}

export type HttpSpecificOptions = Omit<HttpSpecificOptionsRaw, keyof Omit<HttpSpecificOptionsRaw, InputFileOptions>>
