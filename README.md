# Library Management System
A comprehensive full-stack application for managing library resources, including books, users, and lending operations.

## Deployment Links
- Server : https://library-management-api-3b7d.onrender.com (Render)
- Server API Reference : https://library-management-api-3b7d.onrender.com/reference (Render)
- Client : https://library-management-ecru.vercel.app/ (Vercel)
- Database : Hosted on Neon.tech
<br>

_Disclaimer: After a certain period of time, the Render server may go into sleep mode. To ensure uninterrupted access, make sure to click the url above and wait until 50 seconds or more_

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
## Tech Stack
### Backend
- Fastify : Chosen for its speed and low overhead, making it ideal for building fast and scalable backend services.
- TypeScript : Provides static typing, which helps in catching errors early and improving code quality.
- Prisma ORM : Simplifies database interactions with a type-safe API, enhancing productivity and reducing errors.
- PostgreSQL : A robust and reliable relational database system, well-suited for handling complex queries and large datasets.
- Zod Validation : Ensures data integrity and validation, reducing runtime errors and improving security.
- JWT Authentication : Provides a secure method for authenticating users and protecting routes.
- Swagger/OpenAPI : Facilitates API documentation and testing, improving developer experience and collaboration.
- Scalar API Reference : Offers an interactive API documentation interface, enhancing usability for developers.
### Frontend
- Next.js 15 : A powerful React framework that offers server-side rendering and static site generation, improving performance and SEO.
- React 19 : A popular JavaScript library for building user interfaces, known for its component-based architecture.
- TypeScript : Enhances code quality and maintainability with static typing.
- Tailwind CSS : Provides utility-first CSS for rapid UI development, ensuring a consistent and responsive design.
- Radix UI : Offers a set of accessible and customizable UI components, speeding up development.
- Server Actions : Facilitates server-side logic and data fetching, improving performance and user experience.
- Zod Validation : Ensures data integrity and validation on the client-side.
- JWT Authentication (Jose) : Secures client-side routes and user sessions.
## Quick Start with Docker
1. Clone the repository:
   ```bash
   git clone <repository_link>
   cd magpie-assessment
   ```
2. Run the application with Docker:
   ```bash
   docker compose up --build -d
   ```

3. Migrate the database after the container is running:
   ```bash
   docker compose exec api npm run db:migrate
   ```
4. Seed the database after the container is running:
   ```bash
   docker compose exec api npm run db:seed
   ```
5. Access the application:
   
   - Frontend: http://localhost:3001
   - Backend: http://localhost:3000/reference
6. To stop the application:
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
   BASE_URL=backend_url_address_or_localhost:3000
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