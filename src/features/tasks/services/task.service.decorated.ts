import {
  createTask as baseCreateTask,
  getTasks as baseGetTasks,
  getTaskById as baseGetTaskById,
  completeTask as baseCompleteTask,
  getLatestTasks as baseGetLatestTasks,
} from "./task.service"

function withLogging<T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    console.log(`[TaskService] ${name} called`)
    const result = fn(...args)
    console.log(`[TaskService] ${name} completed`)
    return result
  }) as T
}

export const createTask = withLogging(baseCreateTask, "createTask")
export const getTasks = withLogging(baseGetTasks, "getTasks")
export const getTaskById = withLogging(baseGetTaskById, "getTaskById")
export const completeTask = withLogging(baseCompleteTask, "completeTask")
export const getLatestTasks = withLogging(baseGetLatestTasks, "getLatestTasks")
