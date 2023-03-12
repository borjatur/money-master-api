import { type FastifyRequest, type FastifyReply } from 'fastify'
import { type IAccountRepository } from '@core/repositories/account.repo'
import { accountService } from '@core/services/account.svc'
import { type IAccountPayload } from '@core/entities/account.payload'
import { type AccountParamsType } from '@infrastructure/http/schemas/account.schemas'

export const createAccount = (
  accountRepository: IAccountRepository
) => async function (request: FastifyRequest, reply: FastifyReply) {
  const account = await accountService(accountRepository)
    .createAccount(request.body as IAccountPayload)
  void reply.status(201).send(account)
}

export const getAccount = (
  accountRepository: IAccountRepository
) => async function (request: FastifyRequest<{ Params: AccountParamsType }>, reply: FastifyReply) {
  const id = request.params.id
  const account = await accountService(accountRepository)
    .getAccount(id)
  if (account) {
    return await reply.status(200).send(account)
  }
  return await reply.status(404).send({
    statusCode: 404,
    error: 'Not Found',
    message: 'Not Found'
  })
}

export const browseAccounts = (
  accountRepository: IAccountRepository
) => async function (request: FastifyRequest<{ Params: AccountParamsType }>, reply: FastifyReply) {
  const accounts = await accountService(accountRepository)
    .browseAccounts()
  if (accounts.length) {
    return await reply.status(200).send({
      accounts
    })
  }
  return await reply.status(200).send({
    accounts: []
  })
}

export const putAccount = (
  accountRepository: IAccountRepository
) => async function (request: FastifyRequest<{ Params: AccountParamsType }>, reply: FastifyReply) {
  const { id } = request.params
  const account = await accountService(accountRepository)
    .putAccount(id, request.body as IAccountPayload)
  if (account) {
    return await reply.status(200).send(account)
  }
  return await reply.status(404).send({
    statusCode: 404,
    error: 'Not Found',
    message: 'Not Found'
  })
}

export const deleteAccount = (
  accountRepository: IAccountRepository
) => async function (request: FastifyRequest<{ Params: AccountParamsType }>, reply: FastifyReply) {
  const { id } = request.params
  await accountService(accountRepository)
    .deleteAccount(id)
  return await reply.status(204).send({
    statusCode: 204,
    message: 'No Content'
  })
}
