# Task Management API

API REST de gestión de tareas con Node.js, TypeScript y Fastify.

## Stack

- **Node.js** + **TypeScript**
- **Fastify** — servidor HTTP
- **Zod** — validación de schemas
- **Vitest** — testing unitario e integración
- **tsx** — ejecución de TypeScript en desarrollo

## Estructura

Arquitectura de **vertical slices**: cada feature agrupa sus propios tipos, repositorio, servicio, rutas y validadores.

```
src/
├── app.ts                           # buildApp reutilizable (para tests)
├── index.ts                         # entrypoint: buildApp + listen
├── app.test.ts                      # integration tests (endpoints vía inject)
├── lib/
│   ├── errors.ts                    # AppError, NotFoundError (error handling global)
│   ├── logger.ts                    # hooks de logging de Fastify
│   └── date.utils.ts                # utilidades de fecha
└── features/
    └── tasks/
        ├── types/
        │   ├── task.ts              # modelo de dominio
        │   └── task.dto.ts          # DTO para la API (fechas ISO)
        ├── mappers/
        │   └── task.mapper.ts       # Task → TaskDto
        ├── repositories/
        │   └── task.repository.ts   # mock in-memory
        ├── services/
        │   ├── task.service.ts              # lógica de negocio
        │   ├── task.service.decorated.ts  # logging via decorator
        │   └── task.service.test.ts       # unit tests con vitest
        ├── routes/
        │   └── tasks.routes.ts      # definición de endpoints
        └── validators/
            └── task.schema.ts       # schemas Zod para body/params
```

## Features

- **CRUD de tareas**: crear, listar, obtener por id, completar.
- **`createdAt`** en timestamps y mapeo a ISO strings via DTO.
- **Validación** de requests con Zod (body y params).
- **Error handling global**: `NotFoundError` se lanza desde el service y se traduce a `404` en `app.ts`.
- **Logging**: hooks de Fastify (`onRequest`, `preHandler`, `onSend`, `onResponse`) + decorator en service.
- **Tests**:
  - Unitarios: `task.service.test.ts` (mock del repository).
  - Integración: `app.test.ts` (app sin levantar puerto, usando `inject`).

## Scripts

```bash
# desarrollo
npm run dev

# producción
npm start

# build
npm run build

# tests
npm test
```

## Endpoints

| Método | Endpoint                    | Descripción                        |
|--------|-----------------------------|------------------------------------|
| GET    | `/tasks`                    | Lista todas las tareas             |
| GET    | `/tasks/latest`             | Devuelve la tarea más reciente     |
| GET    | `/tasks/:id`                | Obtiene una tarea por ID           |
| POST   | `/tasks`                    | Crea una tarea (`title` + opcional `remindInSeconds`) |
| PATCH  | `/tasks/:id/complete`       | Marca una tarea como completada    |
