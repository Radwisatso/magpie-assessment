# Library Management System API

A comprehensive API for managing library resources, including books, users, and lending operations.

## Database Schema

The system uses PostgreSQL with the following main entities:
- Users
- Members
- Books
- Categories
- Lendings
- BookStatus

## Features
- User authentication and authorization
- Book management (CRUD operations)
- Lending system with due dates
- Real-time book availability tracking
- Analytics dashboard
- API documentation with Swagger and Scalar
- Input validation
- Error handling
- Database transactions for data integrity

## Tech Stack
- Fastify
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod (validation)
- JWT (authentication)
- Swagger/OpenAPI
- Scalar API Reference

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables in `.env`:
```plaintext
DATABASE_URL="postgresql://user:password@localhost:5432/library_db"
```
4. Run database migrations:
```bash
npx prisma migrate dev
```
5. Start the server:
```bash
npm run dev
```

## API Documentation Access

After starting the server, you can access the API documentation in two ways:

1. **Scalar API Reference (Recommended)**
   - URL: [http://localhost:3000/reference](http://localhost:3000/reference)
   - Interactive documentation with request/response examples
   - Built-in API testing interface
   - Organized by resource categories

2. **OpenAPI/Swagger Documentation**
   - URL: [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json)
   - Raw OpenAPI specification

### Authentication
All authenticated endpoints require a Bearer token:
```plaintext
Authorization: Bearer <your_token>
```

### Available Endpoints

#### Authentication
- **POST** `/register` - Register a new user
- **POST** `/login` - Login and get access token

#### Books Management
- **GET** `/books` - Get all books
- **GET** `/books/:id` - Get book by ID
- **POST** `/books` - Create a new book
- **PUT** `/books/:id` - Update a book
- **DELETE** `/books/:id` - Delete a book

#### Lending Operations
- **GET** `/lendings` - Get user's lending history
- **POST** `/lendings/:bookId` - Borrow a book
- **PUT** `/lendings/:id/return` - Return a book

#### Analytics
- **GET** `/analytics` - Get library statistics

## Error Handling

The API uses standard HTTP status codes and returns errors in the following format:
```json
{
  "statusCode": number,
  "message": string,
  "errors": object (optional)
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

