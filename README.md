# Library Management System
A comprehensive full-stack application for managing library resources, including books, users, and lending operations.

## Project Structure
```
├── backend/         # Fastify API server
├── frontend/        # Next.js web application
└── compose.yml      # Docker compose configuration
```

## Features
### Backend
- User authentication with JWT
- Book management (CRUD operations)
- Lending system with due dates
- Real-time book availability tracking
- Analytics dashboard
- API documentation with Swagger and Scalar
- Database transactions for data integrity
### Frontend
- Responsive book management interface
- Protected routes with JWT authentication
- Real-time lending status
- Analytics dashboard
- Mobile-friendly design
## Tech Stack
### Backend
- Fastify
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod validation
- JWT authentication
- Swagger/OpenAPI
- Scalar API Reference
### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI
- Server Actions
- Zod validation
- JWT Authentication (Jose)
## Quick Start with Docker
1. Clone the repository:
   ```bash
   git clone
   cd magpie-assessment
   ```
2. Run the application with Docker:
   ```bash
   docker compose up --build -d
   ```
3. Seed the database after the container is running:
   ```bash
   docker compose exec api npm run db:seed
   ```
4. Access the application:
   
   - Frontend: http://localhost:3001
   - Backend: http://localhost:3000/reference
5. To stop the application:
   ```bash
   docker compose down
   ```
## Running Without Docker
### Backend
1. Navigate to the backend directory
2. Install dependencies: `npm install`
3. Set up environment variables in a .env file:
   ```plaintext
   DATABASE_URL=postgres://user:password@localhost:5432/library_db
   JWT_SECRET=your_secret_key
   ```
4. Run migrations: `npm run db:migrate`
5. Run seeds: `npm run db:seed`
6. Start the development server: `npm run dev`
### Frontend
1. Navigate to the frontend directory
2. Install dependencies: `npm install`
3. Set up environment variables in a .env file:
   ```plaintext
   BASE_URL=http://localhost:3000 
   JWT_SECRET=your_secret_key
   ```
4. Start the development server: `npm run dev`
## Access Points
- Frontend App: http://localhost:3001
- API Server: http://localhost:3000
- API Documentation: http://localhost:3000/reference