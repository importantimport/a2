import { createContext } from '@lit/context'
import {
  type RxDatabase,
  addRxPlugin,
  createRxDatabase,
} from 'rxdb'
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election'
import { getRxStorageLoki } from 'rxdb/plugins/storage-lokijs'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Could not find a declaration file for module 'lokijs/src/incremental-indexeddb-adapter'.
import IncrementalIndexedDBAdapter from 'lokijs/src/incremental-indexeddb-adapter'

import { type SettingsCollection, settingsSchema } from '~/lib/schemas/settings'

/**
 * Polyfill the `global` variable
 * @see {@link https://rxdb.info/install.html#polyfill-the-global-variable}
 */
globalThis.global = globalThis
globalThis.process = {
  ...globalThis.process,
  env: { DEBUG: undefined },
}

if (import.meta.env.DEV)
  await import('rxdb/plugins/dev-mode').then(({ RxDBDevModePlugin }) =>
    addRxPlugin(RxDBDevModePlugin)
  )

addRxPlugin(RxDBLeaderElectionPlugin)

export type A2ZDatabase = RxDatabase<{
  settings: SettingsCollection
}>

let promise: Promise<A2ZDatabase>

const _create = async () => {
  console.log('creating database...')
  const db = await createRxDatabase<A2ZDatabase>({
    name: 'a2z',
    // multiInstance: false,
    // ignoreDuplicate: true,
    storage: getRxStorageLoki({
      env: 'BROWSER',
      adapter: new IncrementalIndexedDBAdapter(),
      autoloadCallback: () => console.log('autoload'),
      autosaveCallback: () => console.log('autosave'),
    }),
  })
  console.log('created database')
  if (import.meta.env.DEV) (globalThis as unknown as { db: unknown }).db = db
  db.waitForLeadership().then(() => {
    console.log('isLeader now')
    globalThis.document.title = '♛ ' + globalThis.document.title
  })
  console.log('create collections')
  await db.addCollections({
    settings: { schema: settingsSchema },
  })
  return db
}

// export type { LeaderElector } from 'broadcast-channel'
export const database = () => {
  if (!promise) promise = _create()
  return promise
}

export const databaseContext = createContext<A2ZDatabase>(Symbol('a2z-database'))