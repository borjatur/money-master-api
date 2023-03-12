import { type RouteOptions, type RouteHandlerMethod } from 'fastify'
import {
  createAccount,
  getAccount,
  browseAccounts,
  putAccount,
  deleteAccount
} from '@infrastructure/http/controllers/account.ctrl'
import { type IAccountRepository } from '@core/repositories/account.repo'
import {
  postAccountSchema,
  getAccountSchema,
  browseAccountsSchema,
  putAccountSchema,
  deleteAccountSchema
} from '@infrastructure/http/schemas/account.schemas'

export const accountRoutes = (accountRepository: IAccountRepository): RouteOptions[] => ([
  {
    method: 'POST',
    url: '/accounts',
    schema: postAccountSchema,
    handler: createAccount(accountRepository)
  },
  {
    method: 'GET',
    url: '/accounts/:id',
    schema: getAccountSchema,
    handler: getAccount(accountRepository) as RouteHandlerMethod
  },
  {
    method: 'GET',
    url: '/accounts',
    schema: browseAccountsSchema,
    handler: browseAccounts(accountRepository) as RouteHandlerMethod
  },
  {
    method: 'PUT',
    url: '/accounts/:id',
    schema: putAccountSchema,
    handler: putAccount(accountRepository) as RouteHandlerMethod
  },
  {
    method: 'DELETE',
    url: '/accounts/:id',
    schema: deleteAccountSchema,
    handler: deleteAccount(accountRepository) as RouteHandlerMethod
  }
])
