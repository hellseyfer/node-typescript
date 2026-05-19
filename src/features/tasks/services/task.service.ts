import { randomUUID } from "crypto"
import { NotFoundError } from "../../../lib/errors"
import { tasks } from "../repositories/task.repository"
import { Task } from "../types/task"

export function createTask(title: string, remindInSeconds?: number): Task {
  const task: Task = {
    id: randomUUID(),
    title,
    completed: false,
    createdAt: Date.now(),
  }

  if (remindInSeconds) {
    const remindAt = Date.now() + remindInSeconds * 1000

    task.remindAt = remindAt

    setTimeout(() => {
      console.log(`Reminder for task: ${task.title}`)
    }, remindInSeconds * 1000)
  }

  tasks.push(task)

  return task
}

export function getTasks(): Task[] {
  return tasks
}

export function getTaskById(id: string): Task {
  const task = tasks.find(t => t.id === id)
  if (!task) throw new NotFoundError("task")
  return task
}

export function getLatestTasks(): Task[] {
  return tasks.sort((a, b) => b.createdAt - a.createdAt).slice(0, 1)
}

export function completeTask(id: string): Task {
  const task = tasks.find(t => t.id === id)
  if (!task) throw new NotFoundError("task")

  task.completed = true

  return task
}