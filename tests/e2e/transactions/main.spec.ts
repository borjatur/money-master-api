import { createServer } from '@infrastructure/http/server'
import { init, closeDbConnection } from '@infrastructure/database'
import { FastifyInstance } from 'fastify';


let server: FastifyInstance

beforeAll(async () => {
  await init('mongodb://localhost:27017/moneyapi')
  server = await createServer('test')
});

afterAll(async () => {
  await server.close()
  await closeDbConnection()
});

describe('(transactions)', () => {

  describe('(GET)', () => {

    describe('(success)', () => {

      it('should return a list of transactions', async () => {

        const response = await server.inject({
          method: 'GET',
          url: '/transactions'
        })
    
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.body)['transactions'].length).toBeDefined()
      })
    })
  })
})
