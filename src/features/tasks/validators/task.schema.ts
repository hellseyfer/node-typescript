import { z } from "zod"

export const createTaskBodySchema = z.object({
  title: z.string().min(1, "title is required"),
  remindInSeconds: z.number().int().positive().optional(),
})

export const taskIdParamSchema = z.object({
  id: z.string().min(1, "id is required"),
})

export type CreateTaskBody = z.infer<typeof createTaskBodySchema>
export type TaskIdParam = z.infer<typeof taskIdParamSchema>
