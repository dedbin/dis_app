# Dis app

![alt text](https://github.com/dedbin/dis_app.git/app/logo.png?raw=true)

Это репозиторий для моего школьного проекта который представляет собой подобие Discord. 
tech stack: Next.js, React, Prisma, Tailwind, Postgres



Функционал:

- Управление участниками (Исключение, Изменение роли Гостя/Модератора)
- Генерация уникальной ссылки-приглашения и полностью работающая система приглашений
- Создание и настройка сервера
- Прекрасный пользовательский интерфейс с использованием TailwindCSS и ShadcnUI
- Полная адаптивность
- Светлая/темная тема
- ORM с использованием Prisma
- База данных Postgres
- Аутентификация с использованием Clerk

### TODO
- Обмен сообщениями в режиме реального времени с использованием Socket.io
- Рендер страницы канала

### Зависимости

**Версия Node 18.x.x**

### Клонирование репозитория

```shell
git clone https://github.com/dedbin/dis_app.git
```

### Установка пакетов

```shell
npm i
```

### Настройка файла .env


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
UPLOADTHING_URL = 
```

### Настройка Prisma

Добавьте базу данных Postgres

```shell
npx prisma generate
npx prisma db push

```

### Запуск приложения

```shell
npm run dev
```
