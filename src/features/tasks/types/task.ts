export interface Task {
  id: string
  title: string
  completed: boolean
  remindAt?: number
  createdAt: number
}
