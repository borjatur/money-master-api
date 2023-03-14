import { createServer } from '@infrastructure/http/server'
import { init, closeDbConnection } from '@infrastructure/database'
import { FastifyInstance } from 'fastify';
import { randomUUID } from 'crypto';


let server: FastifyInstance

beforeAll(async () => {
  await init(`mongodb://localhost:27017/${randomUUID()}`)
  server = await createServer('test')
  const sampleTransaction = {
    type: 'expense',
    description: 'groceries',
    tags: [
      'mercadona',
      'supermarket'
    ],
    accountId: '640f6af054f0213c2d34866f',
    currency: 'EUR',
    amount: 48.4,
    valuedAt: '2023-02-23T00:00:00Z'
  }
  await server.inject({
    method: 'POST',
    url: '/transactions',
    payload: { ...sampleTransaction }
  })
  await server.inject({
    method: 'POST',
    url: '/transactions',
    payload: { ...sampleTransaction, valuedAt: '2023-02-27T00:00:00Z' }
  })
  await server.inject({
    method: 'POST',
    url: '/transactions',
    payload: { ...sampleTransaction, valuedAt: '2023-02-21T00:00:00Z' }
  })
})

afterAll(async () => {
  await server.close()
  await closeDbConnection()
})

describe('(transactions)', () => {

  describe('(GET)', () => {

    describe('(success)', () => {

      it('should return transactions under specific date range', async () => {
        
        const response = await server.inject({
          method: 'GET',
          url: '/transactions?start=2023-02-22&end=2023-02-25'
        })
        
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.body).transactions).toHaveLength(1)
        const { valuedAt } = JSON.parse(response.body).transactions[0]
        expect(valuedAt).toEqual('2023-02-23T00:00:00.000Z')
        
      })
    })

    describe('(validation)', () => {

      it('should return Bad Request when next and prev are present together', async () => {

        const response = await server.inject({
          method: 'GET',
          url: '/transactions?prev=foo&next=bar'
        })
        
        expect(response.statusCode).toBe(400)
        expect(JSON.parse(response.body).message).toEqual('\"next\" and \"prev\" are mutually exclusive')
      })

      it('should return Bad Request when start is present and end is not', async () => {

        const response = await server.inject({
          method: 'GET',
          url: '/transactions?start=2023-02-01'
        })
        
        expect(response.statusCode).toBe(400)
        expect(JSON.parse(response.body).message).toEqual('"start\" must be used alongside \"end\"')
      })

      it('should return Bad Request when end is present and start is not', async () => {

        const response = await server.inject({
          method: 'GET',
          url: '/transactions?end=2023-02-01'
        })
        
        expect(response.statusCode).toBe(400)
        expect(JSON.parse(response.body).message).toEqual('"start\" must be used alongside \"end\"')
      })
    })
  })
})
