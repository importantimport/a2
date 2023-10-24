import type { InputFileOptionsKeys } from './shared'

/**
 * Metalink Specific Options
 * @see {@link https://aria2.github.io/manual/en/html/aria2c.html#metalink-specific-options}
 */
export type MetalinkSpecificOptions = {
  /**
   * If `true` or `mem` is specified,
   * when a file whose suffix is `.meta4` or `.metalink` or content type of `application/metalink4+xml` or `application/metalink+xml` is downloaded,
   * aria2 parses it as a metalink file and downloads files mentioned in it.
   * 
   * @remarks
   * If `mem` is specified, a metalink file is not written to the disk,
   * but is just kept in memory.
   * If `false` is specified,
   * the .metalink file is downloaded to the disk, but is not parsed as a metalink file and its contents are not downloaded.
   * 
   * @defaultValue `true`
   */
  'follow-metalink': boolean | 'mem',
  /**
   * Specify base URI to resolve relative URI in metalink:url and metalink:metaurl element in a metalink file stored in local disk.
   * @remarks If URI points to a directory, URI must end with `/`.
   */
  'metalink-base-uri': string
  /**
   * The file path to ".meta4" and ".metalink" file.
   * 
   * @remarks
   * Reads input from `stdin` when `-` is specified.
   * You are not required to use this option because you can specify ".metalink" files without `--metalink-file`.
   */
  'metalink-file': string
  /** The language of the file to download. */
  'metalink-language': string
  /**
   * The location of the preferred server.
   * A comma-delimited list of locations is acceptable, for example, `jp,us`.
   */
  'metalink-location': string
  /** The operating system of the file to download. */
  'metalink-os': string
  /** The version of the file to download. */
  'metalink-version': string
  /**
   * Specify preferred protocol.
   * @remarks The possible values are `http`, `https`, `ftp` and `none`. Specify `none` to disable this feature.
   * @defaultValue `none`
   */
  'metalink-preferred-protocol': 'http' | 'https' | 'ftp' | 'none'
  /**
   * If `true` is given and several protocols are available for a mirror in a metalink file, aria2 uses one of them.
   * @remarks Use `--metalink-preferred-protocol` option to specify the preference of protocol.
   * @defaultValue `true`
   */
  'metalink-enable-unique-protocol': boolean
}

export type InputFileMetalinkSpecificOptions = Omit<
  MetalinkSpecificOptions,
  keyof Omit<MetalinkSpecificOptions, InputFileOptionsKeys>
>
