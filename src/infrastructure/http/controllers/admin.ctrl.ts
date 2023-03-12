import { type FastifyRequest, type FastifyReply } from 'fastify'

export const healthz = async function (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  return await reply.status(200).send({
    message: 'OK'
  })
}
