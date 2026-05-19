import { describe, it, expect, beforeEach } from "vitest"
import { buildApp } from "./app"
import { tasks } from "./features/tasks/repositories/task.repository"

describe("integration tests", () => {
  beforeEach(() => {
    tasks.length = 0
  })

  it("GET /tasks returns empty array when no tasks", async () => {
    const app = buildApp()
    const response = await app.inject({
      method: "GET",
      url: "/tasks",
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toEqual([])
  })

  it("POST /tasks creates a task and GET /tasks returns it", async () => {
    const app = buildApp()

    const create = await app.inject({
      method: "POST",
      url: "/tasks",
      payload: { title: "integration test" },
    })

    expect(create.statusCode).toBe(201)
    const created = JSON.parse(create.body)
    expect(created.title).toBe("integration test")
    expect(created.completed).toBe(false)

    const getAll = await app.inject({
      method: "GET",
      url: "/tasks",
    })

    expect(getAll.statusCode).toBe(200)
    expect(JSON.parse(getAll.body)).toHaveLength(1)
  })

  it("GET /tasks/:id returns 404 for unknown id", async () => {
    const app = buildApp()
    const response = await app.inject({
      method: "GET",
      url: "/tasks/nonexistent",
    })

    expect(response.statusCode).toBe(404)
    expect(JSON.parse(response.body)).toEqual({
      error: "task not found",
      code: "NOT_FOUND",
    })
  })

  it("POST /tasks with invalid body returns 400", async () => {
    const app = buildApp()
    const response = await app.inject({
      method: "POST",
      url: "/tasks",
      payload: {},
    })

    expect(response.statusCode).toBe(400)
    const body = JSON.parse(response.body)
    expect(body.error).toBe("validation failed")
    expect(body.issues).toBeDefined()
  })

  it("PATCH /tasks/:id/complete marks task as completed", async () => {
    const app = buildApp()

    const create = await app.inject({
      method: "POST",
      url: "/tasks",
      payload: { title: "do me" },
    })

    const created = JSON.parse(create.body)

    const complete = await app.inject({
      method: "PATCH",
      url: `/tasks/${created.id}/complete`,
    })

    expect(complete.statusCode).toBe(200)
    expect(JSON.parse(complete.body).completed).toBe(true)
  })
})
