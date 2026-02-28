# 🚀 NestJS Gateway API Template

Базовый шаблон проекта на NestJS для реализации Gateway API (BFF / API Gateway) в микросервисной архитектуре.

---

# 📌 Описание

Gateway API выступает как единая точка входа в систему и отвечает за:

- Проксирование запросов к внутренним сервисам
- Централизованную аутентификацию и авторизацию
- Логирование
- Обработку ошибок
- Rate limiting
- Унификацию формата ответов

---

# 📦 Стек технологий

- Node.js
- NestJS
- TypeScript
- JWT
- ESLint + Prettier
- Docker (опционально)

---

# 📁 Структура проекта

```
project/
│
│
├── apps
│   └── gateway-api
│       ├── src
│       │   ├── modules
│       │   │   └─── app
│       │   │        ├── controllers
│       │   │        │   ├── app.controller.ts
│       │   │        │   └──index.ts
│       │   │        └── app.module.ts
│       │   └── main.ts      
│       │
│       └──tsconfig.app.json
└── libs
    ├── authorization
    │   ├── src
    │   │   ├── guards
    │   │   │   ├── auth-jwt.guard.ts
    │   │   │   └── index.ts
    │   │   ├── authorization.module.ts
    │   │   └── index.ts
    │   └── tsconfig.lib.json
    ├── common
    │   ├── src
    │   │   ├── decoratos
    │   │   │   ├── is-public.decorator.ts
    │   │   │   └── index.ts
    │   │   └── index.ts
    │   └── tsconfig.lib.json
    └── config
        ├── src
        │   └── index.ts
        └── tsconfig.lib.json
```

---

# ⚙️ Установка

## 1. Установка зависимостей

```bash
npm install
```

## 2. Запуск в режиме разработки

```bash
npm run start:dev
```

## 3. Production запуск

```bash
npm run build
npm run start:prod
```

---

# 🔐 Переменные окружения

Создайте файл `.env`:

```
GATEWAY_API_HOST="localhost"
GATEWAY_API_PORT=3000

JWT_SECRET="secret.dev.key"
JWT_EXPIRES_IN="1d"
```

---

# 🛡️ Авторизация

- JWT-based аутентификация
- Guards для защиты маршрутов
- Role-based access control (опционально)

Пример защищённого контроллера:

```ts
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Req() req) {
  return req.user;
}
```

---

# 🔄 Проксирование запросов

Gateway перенаправляет запросы к внутренним сервисам через централизованный HTTP-клиент.

Пример сервиса:

```ts
@Injectable()
export class UsersService {
  constructor(private readonly http: HttpService) {}

  async findAll() {
    const { data } = await this.http.axiosRef.get(
      process.env.USER_SERVICE_URL + '/users'
    );
    return data;
  }
}
```

---

# 🧾 Формат ответа API

Все ответы могут быть приведены к единому формату:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

---

# 🧯 Обработка ошибок

Используется глобальный `HttpExceptionFilter`:

- Унифицированный формат ошибок
- Логирование
- Обработка ошибок downstream-сервисов

---

# 🚀 Рекомендации по расширению

- Подключить ThrottlerModule для rate limiting
- Добавить Redis для кеширования
- Реализовать Circuit Breaker (например, opossum)
- Подключить Winston или Pino
- Добавить централизованный correlation-id
- Реализовать refresh tokens
- Добавить интеграционные тесты через Supertest

---

# 📄 Лицензия

MIT

---

# 👨‍💻 Назначение шаблона

Этот шаблон предназначен как стартовая точка для:

- Микросервисной архитектуры
- BFF для frontend
- Централизованной авторизации
- API-шлюза между внешними клиентами и внутренними сервисами