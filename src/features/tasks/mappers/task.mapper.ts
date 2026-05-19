import { Task } from "../types/task"
import { TaskDto } from "../types/task.dto"

export function toTaskDto(task: Task): TaskDto {
  return {
    id: task.id,
    title: task.title,
    completed: task.completed,
    createdAt: new Date(task.createdAt).toISOString(),
    ...(task.remindAt !== undefined && {
      remindAt: new Date(task.remindAt).toISOString(),
    }),
  }
}

export function toTaskDtoList(tasks: Task[]): TaskDto[] {
  return tasks.map(toTaskDto)
}
