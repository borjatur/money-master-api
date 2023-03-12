import { type IAccountRepository } from '@core/repositories/account.repo'
import { type ITransactionRepository } from '@core/repositories/transaction.repo'
import { accountRoutes } from '@infrastructure/http/routes/account.routes'
import { transactionRoutes } from '@infrastructure/http/routes/transaction.routes'
import { adminRoutes } from '@infrastructure/http/routes/admin.routes'
import { type RouteOptions } from 'fastify'

export default (
  accountRepository: IAccountRepository,
  transactionRepository: ITransactionRepository
): RouteOptions[] => ([
  ...accountRoutes(accountRepository),
  ...transactionRoutes(transactionRepository),
  ...adminRoutes
])
