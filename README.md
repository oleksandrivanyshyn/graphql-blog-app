# GraphQL Blog App

A full-stack blog application with a GraphQL API. Users can sign up, sign in, and create, publish, and manage blog posts.

## Tech Stack

**Server**
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) (GraphQL)
- [Prisma](https://www.prisma.io/) + PostgreSQL
- TypeScript
- JWT authentication (`jsonwebtoken`, `bcryptjs`)

**Client**
- React 17 + React Router
- [Apollo Client](https://www.apollographql.com/docs/react/)
- React Bootstrap

## Project Structure

```
.
├── client/     React frontend (Create React App)
└── server/     Apollo Server GraphQL API + Prisma
```

## Prerequisites

- Node.js
- Yarn (client) / npm (server)
- Docker (for the PostgreSQL database)

## Getting Started

### 1. Database

Start PostgreSQL via Docker Compose:

```bash
cd server
docker-compose up -d
```

### 2. Server

```bash
cd server
npm install
npx prisma migrate dev
npm start
```

The server requires a `.env` file with:

```
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5435/blog_app?schema=public"
JWT_SECRET="your-secret-key"
```

The GraphQL server runs at the URL printed in the console (Apollo Server default: `http://localhost:4000`).

### 3. Client

```bash
cd client
yarn install
yarn start
```

The React app runs at `http://localhost:3000`.

## GraphQL API

**Queries**
- `me` — current authenticated user
- `posts` — list of posts
- `profile(userId)` — a user's profile

**Mutations**
- `signup(credentials)` / `signin(credentials)` — authentication, returns a JWT
- `postCreate(post)` / `postUpdate(postId, post)` / `postDelete(postId)`
- `postPublish(postId)` / `postUnpublish(postId)`

Authenticated requests pass the JWT via the `Authorization` header.

## Data Model

- **User** — has many posts, an optional profile
- **Post** — belongs to a user, has a `published` flag
- **Profile** — one-to-one with a user, holds a bio
