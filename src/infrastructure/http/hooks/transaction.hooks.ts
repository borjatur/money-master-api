import { type FastifyRequest, type FastifyReply } from 'fastify'
import {
  type TransactionQueryType
} from '@infrastructure/http/schemas/transaction.schemas'

export const browseTransactionsPreHandler = async (
  request: FastifyRequest<{ Querystring: TransactionQueryType }>,
  reply: FastifyReply
) => {
  const { next, prev, start, end } = request.query
  // can not do this with Typebox schema
  if (!!next && !!prev) {
    reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: '"next" and "prev" are mutually exclusive'
    })
  }
  if (start && !end || end && !start) {
    reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: '"start" must be used alongside "end"'
    })
  }
}