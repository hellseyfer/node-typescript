import { FastifyInstance } from "fastify"

export async function requestLogger(app: FastifyInstance) {
  app.addHook("onRequest", async (request) => {
    console.log(`[REQ] ${request.method} ${request.url}`)
  })

  app.addHook("preHandler", async (request) => {
    if (request.body) {
      console.log(`[REQ BODY] ${JSON.stringify(request.body)}`)
    }
  })

  app.addHook("onSend", async (_request, _reply, payload) => {
    console.log(`[RES BODY] ${payload}`)
    return payload
  })

  app.addHook("onResponse", async (request, reply) => {
    console.log(`[RES] ${request.method} ${request.url} → ${reply.statusCode} (${reply.elapsedTime.toFixed(2)}ms)`)
  })
}
