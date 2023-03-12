import { type RouteOptions } from 'fastify'
import { healthz } from '@infrastructure/http/controllers/admin.ctrl'

export const adminRoutes: RouteOptions[] = [
  {
    method: 'GET',
    url: '/healthz',
    handler: healthz
  }
]
