import type { RxJsonSchema, RxCollection } from 'rxdb'

export type Settings = {
  createdAt: number
  updatedAt: number
  key: string
  value: string
}

export type SettingsCollection = RxCollection<Settings>

export const settingsSchema: RxJsonSchema<Settings> = {
  title: 'Settings',
  description: 'Settings',
  version: 0,
  type: 'object',
  indexes: ['createdAt', 'updatedAt'],
  primaryKey: 'key',
  properties: {
    createdAt: {
      type: 'number',
      minimum: 0,
      maximum: 10000000000000,
      multipleOf: 1
    },
    updatedAt: {
      type: 'number',
      minimum: 0,
      maximum: 10000000000000,
      multipleOf: 1
    },
    key: {
      type: 'string',
      maxLength: 64
    },
    value: {
      type: 'string',
    },
  },
  required: ['key', 'value'],
}
