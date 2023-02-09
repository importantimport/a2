import {
  toTypedRxJsonSchema,
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxJsonSchema,
} from 'rxdb'

export const schemaLiteral = {
  title: 'A2Z',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 10,
    },
    message: {
      type: 'string',
      maxLength: 100,
    },
  },
} as const

const schemaTyped = toTypedRxJsonSchema(schemaLiteral)

export type SchemaType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>

export const schema: RxJsonSchema<SchemaType> = schemaLiteral
