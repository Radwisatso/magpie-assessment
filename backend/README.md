# Library Management System API

A RESTful API service for managing library books, built with Fastify, TypeScript, and PostgreSQL.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: Zod

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in the root directory:
```
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
```

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Seed the database:
```bash
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication

#### Register User
- **POST** `/register`
- Body:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "ADMIN" | "MEMBER",
  "phone": "string",
  "status": "ACTIVE" | "INACTIVE"
}
```

#### Login
- **POST** `/login`
- Body:
```json
{
  "email": "string",
  "password": "string"
}
```

### Books Management

All book endpoints require JWT authentication token in the header:
```
Authorization: Bearer <your_token>
```

#### Get All Books
- **GET** `/books`

#### Get Book by ID
- **GET** `/books/:id`

#### Create Book
- **POST** `/books`
- Body:
```json
{
  "title": "string",
  "author": "string",
  "isbn": "string",
  "quantity": number,
  "categoryId": number
}
```

#### Update Book
- **PUT** `/books/:id`
- Body:
```json
{
  "title": "string",
  "author": "string",
  "isbn": "string",
  "quantity": number,
  "categoryId": number
}
```

#### Delete Book
- **DELETE** `/books/:id`

## Error Handling

The API uses standard HTTP status codes and returns errors in the following format:

```json
{
  "statusCode": number,
  "message": "string",
  "errors": [] // optional, present for validation errors
}
```

Common status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Development

### Database Schema Updates

1. Update the schema in `prisma/schema.prisma`
2. Run migration:
```bash
npx prisma migrate dev --name your_migration_name
```

### Type Safety

The project uses TypeScript and Zod for type safety and runtime validation. Make sure to:
- Define types for new features
- Use Zod schemas for request validation
- Keep Prisma schema in sync with your database

## License

ISC