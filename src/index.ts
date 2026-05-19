import { buildApp } from "./app"

const app = buildApp()

app.listen({
  port: 3000,
})
.then(() => {
  console.log("Server running on port 3000")
})
.catch((err: unknown) => {
  console.error(err)
  process.exit(1)
})