# Library Management System

A modern web application for managing library books and lending services, built with Next.js 15 and React 19.

## Features

- 📚 Book Management
  - Create, update, and delete books
  - View book details and availability status
  - Track book quantities and lending status
- 📖 Lending System
  - Borrow books
  - Track borrowed books
  - Return system with due dates
  - Real-time availability updates
- 🔐 Authentication
  - Secure login system
  - Protected routes with JWT
  - Token-based authentication
- 📱 Responsive Design
  - Mobile-friendly interface (responsive grid: 1 column -> 2 columns -> 4 columns)
  - Adaptive layout
  - Clean and modern UI using Tailwind CSS and Radix UI

## Tech Stack

- Next.js 15.1.6
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components
- Server Actions
- Zod Validation
- JWT Authentication (jose)
- date-fns

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```env
BASE_URL=your_api_base_url
JWT_SECRET=your_jwt_secret
```

4. Run the development server
```bash
npm run dev
```

The app will run on port 3001: [http://localhost:3001](http://localhost:3001)

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (protected)/
│   │   └── books/
│   │       ├── [id]/         # Dynamic book edit page
│   │       ├── analytics/    # Analytics dashboard
│   │       ├── create/       # Create new book
│   │       ├── lendings/     # Lending management
│   │       └── _components/  # Shared components
│   ├── actions/             # Server actions
│   └── lib/                 # Utility functions
├── middleware.ts            # Middleware for authentication
```

## Key Features Implementation

- **Server Actions**: Form handling and data mutations with proper validation
- **Protected Routes**: JWT-based middleware authentication
- **Form Validation**: Zod schema for data integrity
- **Responsive Layout**: Mobile-first with Tailwind breakpoints
- **Component Architecture**: Reusable components with TypeScript interfaces
- **Lending System**: Full borrowing and return functionality
- **Analytics**: Book lending and availability statistics

## Scripts

- `npm run dev` - Start development server on port 3001
- `npm run build` - Build the application
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

- `BASE_URL` - Backend API URL (default: http://localhost:3000)
- `JWT_SECRET` - Secret key for JWT authentication

## License

This project is licensed under the MIT License