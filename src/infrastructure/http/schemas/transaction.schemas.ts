import { type FastifySchema } from 'fastify'
import { Type, type Static } from '@sinclair/typebox'
import { notFoundSchema } from '@infrastructure/http/schemas/error.schemas'
import { IdParams, Id } from '@infrastructure/http/schemas/common.schemas'
import { TransactionType, type ITransaction } from '@core/entities/transaction'
import { Currency } from '@core/entities/currency'

const transactionExamples: ITransaction[] = [
  {
    id: '640f6ae37f0aa115b71b1ca6',
    type: TransactionType.EXPENSE,
    description: 'groceries',
    tags: [
      'mercadona',
      'supermarket'
    ],
    accountId: '640f6af054f0213c2d34866f',
    currency: Currency.EUR,
    amount: 48.4,
    valuedAt: '2023-02-23T00:00:00Z',
    createdAt: '2023-02-23T00:00:00Z',
    updatedAt: '2023-02-23T00:00:00Z'
  }, {
    id: '640f6af5d2f7c5073f87efa5',
    type: TransactionType.TRANSFER,
    description: 'debts and bills',
    tags: [
      'transfer'
    ],
    accountId: '640f6b025c3b3a0ad40bf72e',
    destinationAccountId: '640f6afac97d4447cb66990d',
    currency: Currency.EUR,
    amount: 48.4,
    valuedAt: '2023-02-23T00:00:00Z',
    createdAt: '2023-02-23T00:00:00Z',
    updatedAt: '2023-02-23T00:00:00Z'
  }
]

const transactionProperties = {
  id: Id,
  type: Type.Enum(TransactionType),
  description: Type.String(),
  tags: Type.Array(Type.String()),
  accountId: Id,
  destinationAccountId: Type.Optional(Id),
  currency: Type.Enum(Currency),
  amount: Type.Number(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  valuedAt: Type.String()
}

const Transaction = Type.Object(transactionProperties, {
  examples: [...transactionExamples]
})

const Transactions = Type.Object({
  next: Type.Optional(Type.String()),
  transactions: Type.Array(Type.Object(transactionProperties))
}, {
  examples: [{
    next: '/transactions?next=6409f054fb61cfd1065a2519',
    transactions: [...transactionExamples]
  }]
})

const TransactionPayload = Type.Omit(
  Type.Object(transactionProperties),
  ['id', 'createdAt', 'updatedAt'],
  {
    examples: [...transactionExamples.map(({ id, createdAt, updatedAt, ...body }) => body)]
  }
)

const TransactionParams = IdParams

const TransactionQueryParams = Type.Optional(
  Type.Object({
    start: Type.Optional(Type.String({ format: 'date' })),
    end: Type.Optional(Type.String({ format: 'date' })),
    next: Type.Optional(Type.String()),
    prev: Type.Optional(Type.String())
  })
)

export type TransactionParamsType = Static<typeof TransactionParams>

export type TransactionQueryType = Static<typeof TransactionQueryParams>

export const postTransactionSchema: FastifySchema = {
  description: 'Create a new transaction',
  tags: ['transactions'],
  summary: 'Creates new transaction',
  body: TransactionPayload,
  response: {
    201: { ...Transaction, description: 'Success' }
  }
}

export const getTransactionSchema: FastifySchema = {
  description: 'Gets a single transaction',
  tags: ['transactions'],
  summary: 'Gets transaction by Id',
  params: TransactionParams,
  response: {
    200: { ...Transaction, description: 'Success' },
    404: { ...notFoundSchema, description: 'Not found' }
  }
}

export const browseTransactionsSchema: FastifySchema = {
  description: 'Get a list of transactions',
  tags: ['transactions'],
  summary: 'Get transactions',
  querystring: TransactionQueryParams,
  response: {
    200: { ...Transactions, description: 'Success' }
  }
}

export const putTransactionSchema: FastifySchema = {
  description: 'Updates existing transaction',
  tags: ['transactions'],
  summary: 'Updates transaction by Id',
  params: TransactionParams,
  body: TransactionPayload,
  response: {
    200: { ...Transaction, description: 'Success' },
    404: { ...notFoundSchema, description: 'Not found' }
  }
}

const deleteResponse = Type.Object({
  statusCode: Type.Number({ example: 204 }),
  message: Type.String({ example: 'No Content' })
})

export const deleteTransactionSchema: FastifySchema = {
  description: 'Deletes a single transaction',
  tags: ['transactions'],
  summary: 'Deletes transaction by Id',
  params: TransactionParams,
  response: {
    204: {
      ...deleteResponse,
      description: 'No Content'
    }
  }
}
