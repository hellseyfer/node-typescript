import { Task } from "../types/task"

export const tasks: Task[] = [
  {
    id: "mock-1",
    title: "Buy groceries",
    completed: false,
    createdAt: Date.now() - 86400000,
    remindAt: Date.now() + 3600000,
  },
  {
    id: "mock-2",
    title: "Walk the dog",
    completed: true,
    createdAt: Date.now() - 172800000,
  },
  {
    id: "mock-3",
    title: "Call dentist",
    completed: false,
    createdAt: Date.now() - 43200000,
    remindAt: Date.now() + 7200000,
  },
  {
    id: "mock-4",
    title: "Read book chapter 3",
    completed: false,
    createdAt: Date.now() - 259200000,
  },
  {
    id: "mock-5",
    title: "Water plants",
    completed: true,
    createdAt: Date.now() - 604800000,
  },
]