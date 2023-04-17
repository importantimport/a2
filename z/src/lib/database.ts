import {
  type RxCollection,
  type RxDatabase,
  addRxPlugin,
  createRxDatabase,
} from 'rxdb'
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election'
import { getRxStorageLoki } from 'rxdb/plugins/storage-lokijs'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Could not find a declaration file for module 'lokijs/src/incremental-indexeddb-adapter'.
import IncrementalIndexedDBAdapter from 'lokijs/src/incremental-indexeddb-adapter'

import { type SchemaType, schema } from '~/lib/schema'

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

type MyDatabase = RxDatabase<{
  test: RxCollection<SchemaType>
  settings: SettingsCollection
}>

let promise: Promise<MyDatabase>

const _create = async () => {
  console.log('creating database...')
  const db = await createRxDatabase<MyDatabase>({
    name: 'exampledb',
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
    test: { schema },
    settings: { schema: settingsSchema },
  })
  return db
}

// export type { LeaderElector } from 'broadcast-channel'
export const db = () => {
  if (!promise) promise = _create()
  return promise
}
