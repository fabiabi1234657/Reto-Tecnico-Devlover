# DevLocker v1 - API REST

API REST para gestionar snippets privados con JWT, MongoDB y Express.

## Requisitos

- Node.js 18+
- MongoDB local o remoto

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Crear archivo `.env` usando `.env.example`:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/devlocker
JWT_SECRET=super_secret_key_change_me
JWT_EXPIRES_IN=7d
```

3. Ejecutar en desarrollo:

```bash
npm run dev
```

También puedes ejecutar en modo normal:

```bash
npm start
```


## Solución de problemas (Windows)

- Si MongoDB está corriendo pero falla con `localhost:27017`, usa `127.0.0.1` en `MONGODB_URI`.
- Verifica el servicio:

```powershell
Get-Service MongoDB
```

- Si está detenido, inícialo:

```powershell
net start MongoDB
```

## Endpoints

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### Snippets (protegidos con Bearer Token)

- `POST /api/v1/snippets` crea snippet (el `user` se toma desde `req.user._id`; si envías `user` en body se rechaza)
- `GET /api/v1/snippets` lista solo snippets del usuario autenticado
- `PUT /api/v1/snippets/:id` actualiza solo si pertenece al usuario autenticado (solo campos enviados: `title`, `language`, `code`, `tags`)
- `DELETE /api/v1/snippets/:id` elimina solo si pertenece al usuario autenticado

## Ejemplos rápidos

### Registro

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "User A",
  "email": "usera@mail.com",
  "password": "123456"
}
```

### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "usera@mail.com",
  "password": "123456"
}
```

### Crear snippet

```http
POST /api/v1/snippets
Authorization: Bearer TU_TOKEN
Content-Type: application/json

{
  "title": "Fetch básico",
  "language": "javascript",
  "code": "fetch('https://api.example.com')",
  "tags": ["api", "http"]
}
```

## Prueba de fuego (privacidad)

1. Registrar `User A` y `User B`.
2. Crear snippet con token de `User A`.
3. Intentar borrar ese snippet con token de `User B`.
4. Resultado esperado: `404` (no encontrado para ese usuario) o `401`.

## Stack usado

- Express
- Mongoose
- JWT (`jsonwebtoken`)
- `express-validator`
- Patrón `asyncHandler`
- Middleware global de errores con respuesta JSON consistente
