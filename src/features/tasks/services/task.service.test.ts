import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import {
  createTask,
  getTaskById,
  completeTask,
  getLatestTasks,
} from "./task.service"
import { tasks } from "../repositories/task.repository"

describe("task.service", () => {
  beforeEach(() => {
    tasks.length = 0
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("createTask", () => {
    it("creates a task with title and completed false", () => {
      const task = createTask("hello")

      expect(task.title).toBe("hello")
      expect(task.completed).toBe(false)
      expect(typeof task.id).toBe("string")
      expect(task.id).toHaveLength(36)
      expect(task.createdAt).toBe(Date.now())
    })

    it("pushes task into repository", () => {
      createTask("hello")
      expect(tasks).toHaveLength(1)
    })

    it("sets remindAt when remindInSeconds is provided", () => {
      vi.setSystemTime(1000000)
      const task = createTask("remind me", 60)

      expect(task.remindAt).toBe(1000000 + 60_000)
    })

    it("schedules a reminder timeout when remindInSeconds is provided", () => {
      vi.setSystemTime(0)
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})

      createTask("remind me", 1)
      expect(consoleSpy).not.toHaveBeenCalled()

      vi.advanceTimersByTime(1000)
      expect(consoleSpy).toHaveBeenCalledWith("Reminder for task: remind me")

      consoleSpy.mockRestore()
    })
  })

  describe("getTaskById", () => {
    it("returns task by id", () => {
      const created = createTask("find me")
      const found = getTaskById(created.id)

      expect(found).toEqual(created)
    })

    it("throws NotFoundError when task does not exist", () => {
      expect(() => getTaskById("nonexistent")).toThrow("task not found")
    })
  })

  describe("completeTask", () => {
    it("marks task as completed and returns it", () => {
      const created = createTask("do me")
      const completed = completeTask(created.id)

      expect(completed.completed).toBe(true)
      expect(tasks[0].completed).toBe(true)
    })

    it("throws NotFoundError when task does not exist", () => {
      expect(() => completeTask("nonexistent")).toThrow("task not found")
    })
  })

  describe("getLatestTasks", () => {
    it("returns one task sorted by createdAt desc", () => {
      vi.setSystemTime(1000)
      createTask("first")

      vi.setSystemTime(3000)
      createTask("second")

      vi.setSystemTime(2000)
      createTask("third")

      const latest = getLatestTasks()

      expect(latest).toHaveLength(1)
      expect(latest[0].title).toBe("second")
    })
  })
})
