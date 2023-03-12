import { type FastifyRequest, type FastifyReply } from 'fastify'
import {
  type ITransactionRepository,
  type ITransactionFilterCriteria
} from '@core/repositories/transaction.repo'
import { transactionService } from '@core/services/transaction.svc'
import { type ITransactionPayload } from '@core/entities/transaction.payload'
import {
  type TransactionParamsType,
  type TransactionQueryType
} from '@infrastructure/http/schemas/transaction.schemas'
import { ValidationError } from '@core/errors'

export const createTransaction = (
  transactionRepository: ITransactionRepository
) => async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    const transaction = await transactionService(transactionRepository)
      .createTransaction(request.body as ITransactionPayload)
    void reply.status(201).send(transaction)
  } catch (err) {
    if (err instanceof ValidationError) {
      void reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: err.message
      })
    }
    throw err
  }
}

export const getTransaction = (
  transactionRepository: ITransactionRepository
) => async function (request: FastifyRequest<{ Params: TransactionParamsType }>, reply: FastifyReply) {
  const id = request.params.id
  const transaction = await transactionService(transactionRepository)
    .getTransaction(id)
  if (transaction) {
    return await reply.status(200).send(transaction)
  }
  return await reply.status(404).send({
    statusCode: 404,
    error: 'Not Found',
    message: 'Not Found'
  })
}

export const browseTransactions = (
  transactionRepository: ITransactionRepository
) => async function (
  request: FastifyRequest<{ Querystring: TransactionQueryType }>,
  reply: FastifyReply
) {
  const { next, prev, start, end } = request.query
  if (next && prev) {
    // can not do this with Typebox schema
    return await reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: 'next and prev are mutually exclusive'
    })
  }
  const filterCriteria: ITransactionFilterCriteria = {}
  if (next) {
    filterCriteria.pagination = {
      next
    }
  }
  if (prev) {
    filterCriteria.pagination = {
      prev
    }
  }
  if (start && end) {
    filterCriteria.start = new Date(start)
    filterCriteria.end = new Date(end)
  }

  const transactions = await transactionService(transactionRepository)
    .browseTransactions(filterCriteria)
  if (transactions.length) {
    return await reply.status(200).send({
      next: `${request.routerPath}?next=${transactions[transactions.length - 1].id}`,
      transactions
    })
  }
  return await reply.status(200).send({ transactions: [] })
}

export const putTransaction = (
  transactionRepository: ITransactionRepository
) => async function (request: FastifyRequest<{ Params: TransactionParamsType }>, reply: FastifyReply) {
  try {
    const { id } = request.params
    const transaction = await transactionService(transactionRepository)
      .putTransaction(id, request.body as ITransactionPayload)
    if (transaction) {
      return await reply.status(200).send(transaction)
    }
    return await reply.status(404).send({
      statusCode: 404,
      error: 'Not Found',
      message: 'Not Found'
    })
  } catch (err) {
    if (err instanceof ValidationError) {
      void reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: err.message
      })
    }
    throw err
  }
}

export const deleteTransaction = (
  transactionRepository: ITransactionRepository
) => async function (request: FastifyRequest<{ Params: TransactionParamsType }>, reply: FastifyReply) {
  const { id } = request.params
  await transactionService(transactionRepository)
    .deleteTransaction(id)
  return await reply.status(204).send({
    statusCode: 204,
    message: 'No Content'
  })
}
