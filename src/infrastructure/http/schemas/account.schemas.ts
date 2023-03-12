import { type FastifySchema } from 'fastify'
import { Type, type Static } from '@sinclair/typebox'
import { notFoundSchema } from '@infrastructure/http/schemas/error.schemas'
import { IdParams, Id } from '@infrastructure/http/schemas/common.schemas'
import { AccounType, IAccount } from '@core/entities/account'
import { Currency } from '@core/entities/currency'

const accountExamples: IAccount[] = [
  {
    id: '63cd0e4be59031edffa39f5c',
    accountType: AccounType.BANK,
    name: 'Evo Banco',
    iban: 'ES6702390806720039427026',
    balance: 8345,
    currency: Currency.EUR,
    updatedAt: '2023-02-27T08:56:07.241Z',
    createdAt: '2023-02-27T08:56:07.241Z'
  }
]

const Account = Type.Object({
  id: Id,
  accountType: Type.Enum(AccounType),
  name: Type.String(),
  iban: Type.Optional(Type.String()),
  balance: Type.Number(),
  currency: Type.Enum(Currency),
  createdAt: Type.String(),
  updatedAt: Type.String()
}, {
  examples: [...accountExamples]
})

const Accounts = Type.Object({
  accounts: Type.Array(Account)
}, {
  examples: [{
    accounts: [...accountExamples]
  }]
})

const AccountPayload = Type.Omit(
  Account,
  ['id', 'updatedAt', 'createdAt'],
  {
    examples: [...accountExamples.map(({ id, createdAt, updatedAt, ...body }) => body)]
  }
)

const AccountParams = IdParams

export type AccountParamsType = Static<typeof AccountParams>

export const postAccountSchema: FastifySchema = {
  description: 'Create a new account',
  tags: ['accounts'],
  summary: 'Creates new account',
  body: AccountPayload,
  response: {
    201: { ...Account, description: 'Success' }
  }
}

export const getAccountSchema: FastifySchema = {
  description: 'Gets a single account',
  tags: ['accounts'],
  summary: 'Gets account by Id',
  params: AccountParams,
  response: {
    200: { ...Account, description: 'Success' },
    404: { ...notFoundSchema, description: 'Not found' }
  }
}

export const browseAccountsSchema: FastifySchema = {
  description: 'Get a list of accounts',
  tags: ['accounts'],
  summary: 'Get accounts',
  response: {
    200: { ...Accounts, description: 'Success' }
  }
}

export const putAccountSchema: FastifySchema = {
  description: 'Updates existing account',
  tags: ['accounts'],
  summary: 'Updates account by Id',
  params: AccountParams,
  body: AccountPayload,
  response: {
    200: { ...Account, description: 'Success' },
    404: { ...notFoundSchema, description: 'Not found' }
  }
}

const deleteResponse = Type.Object({
  statusCode: Type.Number({ example: 204 }),
  message: Type.String({ example: 'No Content' })
})

export const deleteAccountSchema: FastifySchema = {
  description: 'Deletes a single account',
  tags: ['accounts'],
  summary: 'Deletes account by Id',
  params: AccountParams,
  response: {
    204: {
      ...deleteResponse,
      description: 'No Content'
    }
  }
}
