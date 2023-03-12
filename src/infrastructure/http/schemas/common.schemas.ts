import { Type } from '@sinclair/typebox'

export const IdParams = Type.Object({
  id: Type.String({ description: 'id' })
})

export const Id = Type.String({ pattern: '^[0-9a-fA-F]{24}$' })
