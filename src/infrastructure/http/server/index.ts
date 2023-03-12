import fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify'
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import routes from '@infrastructure/http/routes'
import { AccountRepository } from '@infrastructure/repositories/account.repo'
import { TransactionRepository } from '@infrastructure/repositories/transaction.repo'
import docs from '@infrastructure/http/plugins/docs'
import config from '@infrastructure/http/plugins/config'
import cors from '@fastify/cors'

export const createServer = async (): Promise<FastifyInstance> => {
  const envToLogger: any = {
    development: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      }
    },
    production: true,
    test: false
  }

  const environment = process.env.NODE_ENV ?? 'production'

  const serverOptions: FastifyServerOptions = {
    ajv: {
      customOptions: {
        removeAdditional: 'all',
        coerceTypes: true,
        useDefaults: true,
        keywords: ['kind', 'modifier']
      }
    },
    logger: envToLogger[environment] ?? true
  }
  const server = fastify(serverOptions).withTypeProvider<TypeBoxTypeProvider>()

  await server.register(docs)
  await server.register(config)
  await server.register(cors, {
    origin: '*'
  })

  const accountRepository = new AccountRepository()
  const transactionRepository = new TransactionRepository()

  const applicationRoutes = routes(
    accountRepository,
    transactionRepository
  )
  applicationRoutes.forEach((route) => {
    server.route(route)
  })

  await server.ready()
  return server
}
