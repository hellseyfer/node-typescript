import { FastifyInstance } from "fastify"
import {
  createTask,
  getTasks,
  completeTask,
  getTaskById,
  getLatestTasks
} from "../services/task.service.decorated"
import { toTaskDto, toTaskDtoList } from "../mappers/task.mapper"
import { createTaskBodySchema, taskIdParamSchema } from "../validators/task.schema"

export async function taskRoutes(app: FastifyInstance) {
  app.get("/tasks", async () => {
    return toTaskDtoList(getTasks())
  })

  app.get("/tasks/latest", async () => {
    return toTaskDtoList(getLatestTasks())
  })

  app.get("/tasks/:id", async (request) => {
    //No hay try/catch en ninguna route porque el framework lo hace por vos.
    const params = taskIdParamSchema.parse(request.params)
    const task = getTaskById(params.id)
    return toTaskDto(task)
  })

  app.post("/tasks", async (request, reply) => {
    const body = createTaskBodySchema.parse(request.body)
    const task = createTask(body.title, body.remindInSeconds)
    return reply.status(201).send(toTaskDto(task))
  })

  app.patch("/tasks/:id/complete", async (request) => {
    const params = taskIdParamSchema.parse(request.params)
    const task = completeTask(params.id)
    return toTaskDto(task)
  })
}