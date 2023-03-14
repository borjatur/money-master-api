import { 
  type RouteOptions,
  type RouteHandlerMethod
} from 'fastify'
import {
  createTransaction,
  getTransaction,
  browseTransactions,
  putTransaction,
  deleteTransaction
} from '@infrastructure/http/controllers/transaction.ctrl'
import {
  browseTransactionsPreHandler
} from '@infrastructure/http/hooks/transaction.hooks'
import { type ITransactionRepository } from '@core/repositories/transaction.repo'
import {
  postTransactionSchema,
  getTransactionSchema,
  browseTransactionsSchema,
  putTransactionSchema,
  deleteTransactionSchema
} from '@infrastructure/http/schemas/transaction.schemas'

export const transactionRoutes = (transactionRepository: ITransactionRepository): RouteOptions[] => ([
  {
    method: 'POST',
    url: '/transactions',
    schema: postTransactionSchema,
    handler: createTransaction(transactionRepository)
  },
  {
    method: 'GET',
    url: '/transactions/:id',
    schema: getTransactionSchema,
    handler: getTransaction(transactionRepository) as RouteHandlerMethod
  },
  {
    method: 'GET',
    url: '/transactions',
    schema: browseTransactionsSchema,
    preHandler: browseTransactionsPreHandler as RouteHandlerMethod,
    handler: browseTransactions(transactionRepository) as RouteHandlerMethod
  },
  {
    method: 'PUT',
    url: '/transactions/:id',
    schema: putTransactionSchema,
    handler: putTransaction(transactionRepository) as RouteHandlerMethod
  },
  {
    method: 'DELETE',
    url: '/transactions/:id',
    schema: deleteTransactionSchema,
    handler: deleteTransaction(transactionRepository) as RouteHandlerMethod
  }
])
