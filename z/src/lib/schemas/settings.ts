import type { RxJsonSchema } from 'rxdb'

export type Setting = {
  createdAt: number
  updatedAt: number
  key: string
  value: string
}

export const settingSchema: RxJsonSchema<Setting> = {
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
