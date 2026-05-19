import Fastify from "fastify"
import { ZodError } from "zod"
import { AppError } from "./lib/errors"
import { taskRoutes } from "./features/tasks/routes/tasks.routes"

export function buildApp() {
  const app = Fastify({
    logger: false,
  })

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: "validation failed",
        issues: error.issues.map(i => ({ path: i.path, message: i.message })),
      })
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        error: error.message,
        code: error.code,
      })
    }

    console.error(error)
    return reply.status(500).send({
      error: "internal server error",
    })
  })

  app.register(taskRoutes)

  return app
}
