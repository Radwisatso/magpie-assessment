import { bookSchema, userLoginSchema, userRegistrationSchema } from "./schemas";
import { Prisma, PrismaClient } from "@prisma/client";
import Fastify, { FastifyInstance } from "fastify";
import fastifyFormBody from "@fastify/formbody";
import z from "zod";
import { comparePassword, hashPassword } from "../utils/hash";
import { signToken, verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { addDays } from "date-fns";
import ScalarApiReference from "@scalar/fastify-api-reference";
import FastifySwagger from "@fastify/swagger";
import {
  analyticsSchemaAPI,
  createBookSchemaAPI,
  createLendingSchemaAPI,
  deleteBookSchemaAPI,
  getBookByIdSchemaAPI,
  getBooksSchemaAPI,
  getCategoriesSchemaAPI,
  getLendingsSchemaAPI,
  loginSchemaAPI,
  registerSchemaAPI,
  returnBookSchemaAPI,
  rootSchemaAPI,
  updateBookSchemaAPI,
} from "./openapi";
import { fastifyCors } from "@fastify/cors";

declare module "fastify" {
  interface FastifyRequest {
    user: JwtPayload | null;
  }
}

const prisma = new PrismaClient();

const server: FastifyInstance = Fastify({});

server.register(fastifyCors);

server.register(FastifySwagger, {
  openapi: {
    info: {
      title: "Library Management API",
      description: "API for managing library books, users, and lending records",
      version: "1.0.0",
    },
    tags: [
      { name: "Home", description: "Entrypoint for the API"},
      { name: "Auth", description: "Authentication endpoints" },
      { name: "Books", description: "Book management endpoints" },
      { name: "Lendings", description: "Lending management endpoints" },
      { name: "Analytics", description: "Analytics and reporting endpoints" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});

server.decorateRequest("user", null);
server.register(fastifyFormBody);

// ** PUBLIC ROUTES
server.register(async function publicContext(childServer) {
  childServer.get("/", rootSchemaAPI, (request, reply) => {
    reply.send({
      statusCode: 200,
      message: `Welcome to the library management API, please visit ${
        process.env.BASE_URL || "http://localhost:3000"
      }/reference for more information`,
    });
  });
  childServer.post("/register", registerSchemaAPI, async (request, reply) => {
    const parsedBody = userRegistrationSchema.parse(request.body);
    parsedBody.password = await hashPassword(parsedBody.password);
    const { name, email, password, role, phone, status } = parsedBody;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
        members: {
          create: [
            {
              name,
              email,
              joinedDate: new Date(),
              status,
              phone,
            },
          ],
        },
      },
    });
    reply.status(201).send({
      statusCode: 201,
      message: "Successfully create a user",
      data: newUser,
    });
  });
  childServer.post("/login", loginSchemaAPI, async (request, reply) => {
    const parsedBody = userLoginSchema.parse(request.body);
    const { email, password } = parsedBody;
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!foundUser) {
      throw { statusCode: 401, message: "Unauthorized" };
    }
    const isPasswordValid = await comparePassword(password, foundUser.password);
    if (!isPasswordValid) {
      throw { statusCode: 401, message: "Unauthorized" };
    }

    const token = signToken({
      id: foundUser.id,
      email: foundUser.email,
    });

    reply.status(200).send({
      statusCode: 200,
      message: "Successfully login",
      data: { token },
    });
  });
});

// ** PROTECTED ROUTES
server.register(async function authenticatedContext(childServer) {
  // AUTHENTICATION
  childServer.addHook("preHandler", async (request, reply) => {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      throw { statusCode: 401, message: "Unauthorized" };
    }
    const decoded = verifyToken(token) as JwtPayload;
    request.user = decoded;
    if (!decoded) {
      throw { statusCode: 401, message: "Unauthorized" };
    }
  });

  // GET CATEGORIES
  childServer.get("/categories", getCategoriesSchemaAPI, async (request, reply) => {
    const categories = await prisma.category.findMany();
    reply.code(200).send({
      statusCode: 200,
      message: "Successfully fetch categories",
      data: categories,
    });
  })


  // GET BOOKS
  childServer.get("/books", getBooksSchemaAPI, async (request, reply) => {
    const books = await prisma.book.findMany({
      include: {
        category: true
      }
    });
    // console.log(books)
    reply.code(200).send({
      statusCode: 200,
      message: "Successfully fetch books",
      data: books,
    });
  });
  // GET BOOK BY ID
  childServer.get(
    "/books/:id",
    getBookByIdSchemaAPI,
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const book = await prisma.book.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          category: true,
        }
      });
      if (!book) {
        throw { statusCode: 404, message: "Book not found" };
      }
      reply.code(200).send({
        statusCode: 200,
        message: "Successfully fetch book",
        data: book,
      });
    }
  );
  // CREATE BOOK
  childServer.post("/books", createBookSchemaAPI, async (request, reply) => {
    const parsedBody = bookSchema.parse(request.body);
    if (!request.user) {
      throw { statusCode: 401, message: "Unauthorized" };
    }

    const { title, author, isbn, quantity, categoryId } = parsedBody;
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        quantity,
        categoryId,
        createdBy: request.user.id,
        status: {
          create: {
            availableQty: quantity,
            borrowedQty: 0,
          },
        },
      },
    });
    reply.status(201).send({
      statusCode: 201,
      message: "Successfully created a book",
      data: newBook,
    });
  });
  // UPDATE BOOK
  childServer.put("/books/:id", updateBookSchemaAPI, async (request, reply) => {
    const { id } = request.params as { id: string };
    const parsedBody = bookSchema.parse(request.body);
    const { title, author, isbn, quantity, categoryId } = parsedBody;
    if (!request.user) {
      throw { statusCode: 401, message: "Unauthorized" };
    }
    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!book) {
      throw { statusCode: 404, message: "Book not found" };
    }
    const updatedBook = await prisma.book.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        author,
        isbn,
        quantity,
        categoryId,
      },
    });
    reply.status(200).send({
      statusCode: 200,
      message: "Successfully updated a book",
      data: updatedBook,
    });
  });
  // DELETE BOOK
  childServer.delete(
    "/books/:id",
    deleteBookSchemaAPI,
    async (request, reply) => {
      const { id } = request.params as { id: string };
      if (!request.user) {
        throw { statusCode: 401, message: "Unauthorized" };
      }
      const book = await prisma.book.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!book) {
        throw { statusCode: 404, message: "Book not found" };
      }
      if (book.createdBy !== request.user.id) {
        throw { statusCode: 403, message: "Forbidden" };
      }
      await prisma.book.delete({
        where: {
          id: parseInt(id),
        },
        include: {
          status: true,
        },
      });
      reply.status(200).send({
        statusCode: 200,
        message: "Successfully deleted a book",
      });
    }
  );
  // CREATE LENDING
  childServer.post(
    "/lendings/:bookId",
    createLendingSchemaAPI,
    async (request, reply) => {
      const { bookId } = request.params as { bookId: string };
      if (!request.user) {
        throw { statusCode: 401, message: "Unauthorized" };
      }
      const book = await prisma.book.findUnique({
        where: {
          id: parseInt(bookId),
        },
        include: {
          status: true,
        },
      });
      if (!book) {
        throw { statusCode: 404, message: "Book not found" };
      }
      if (book.status?.availableQty === 0) {
        throw { statusCode: 400, message: "Book is not available" };
      }
      const lendingTransaction = await prisma.$transaction(
        async (tx: Prisma.TransactionClient) => {
          const newLending = await tx.lending.create({
            data: {
              bookId: parseInt(bookId),
              memberId: request.user?.id,
              status: "BORROWED",
              borrowedDate: new Date(),
              dueDate: addDays(new Date(), 7),
              createdBy: request.user?.id,
            },
          });

          await tx.bookStatus.update({
            where: {
              id: parseInt(bookId),
            },
            data: {
              availableQty: {
                decrement: 1,
              },
              borrowedQty: {
                increment: 1,
              },
            },
          });
          return newLending;
        }
      );

      reply.status(201).send({
        statusCode: 201,
        message: "Successfully borrowed a book",
        data: lendingTransaction,
      });
    }
  );
  // GET USERS/MEMBERS LENDINGS HISTORY
  childServer.get("/lendings", getLendingsSchemaAPI, async (request, reply) => {
    if (!request.user) {
      throw { statusCode: 401, message: "Unauthorized" };
    }
    const lendings = await prisma.lending.findMany({
      where: {
        memberId: request.user?.id,
      },
      include: {
        book: true,
      },
    });
    reply.status(200).send({
      statusCode: 200,
      message: "Successfully retrieved lendings",
      data: lendings,
    });
  });
  // RETURN BOOK LENDINGS
  childServer.put(
    "/lendings/:id/return",
    returnBookSchemaAPI,
    async (request, reply) => {
      const { id } = request.params as { id: string };
      if (!request.user) {
        throw { statusCode: 401, message: "Unauthorized" };
      }
      const lending = await prisma.lending.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          book: true,
        },
      });
      if (!lending) {
        throw { statusCode: 404, message: "Lending not found" };
      }
      if (lending.memberId !== request.user.id) {
        throw { statusCode: 403, message: "Forbidden" };
      }
      if (lending.status === "RETURNED") {
        throw { statusCode: 400, message: "Book has already been returned" };
      }
      const returningBookTransaction = await prisma.$transaction(
        async (tx: Prisma.TransactionClient) => {
          const updateLending = await tx.lending.update({
            where: {
              id: parseInt(id),
            },
            data: {
              status: "RETURNED",
              returnDate: new Date(),
            },
          });
          await tx.bookStatus.update({
            where: {
              id: lending.bookId,
            },
            data: {
              availableQty: {
                increment: 1,
              },
              borrowedQty: {
                decrement: 1,
              },
            },
          });
          return updateLending;
        }
      );
      reply.status(200).send({
        statusCode: 200,
        message: "Successfully returned a book",
        data: returningBookTransaction,
      });
    }
  );
  // ANALYTICS
  childServer.get("/analytics", analyticsSchemaAPI, async (request, reply) => {
    if (!request.user) {
      throw { statusCode: 401, message: "Unauthorized" };
    }
    const [totalBooks, totalLendings, activeLendings, overdueLendings] =
      await Promise.all([
        prisma.book.count(),
        prisma.lending.count(),
        prisma.lending.count({
          where: {
            status: "BORROWED",
          },
        }),
        prisma.lending.count({
          where: {
            status: "BORROWED",
            dueDate: {
              lt: new Date(),
            },
          },
        }),
      ]);
    reply.status(200).send({
      statusCode: 200,
      message: "Successfully retrieved analytics",
      data: {
        totalBooks,
        totalLendings,
        activeLendings,
        overdueLendings,
      },
    });
  });
});

// ** ERROR HANDLER
server.setErrorHandler((error, request, reply) => {
  console.log(error);
  if (error.statusCode) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  switch (error.name) {
    case "PrismaClientKnownRequestError":
    case "PrismaClientValidationError":
    case "PrismaClientUnknownRequestError":
    case "PrismaClientRustPanicError":
    case "PrismaClientInitializationError":
      return reply.status(400).send({
        statusCode: 400,
        message: error.message,
      });
  }

  if (error instanceof z.ZodError) {
    return reply.status(400).send({
      statusCode: 400,
      message: "Validation Errors",
      errors: error.errors,
    });
  }

  reply.status(500).send({
    statusCode: 500,
    message: "Internal Server Error",
    errors: error,
  });
});

server.get("/openapi.json", async (request, reply) => {
  return server.swagger();
});

// ** SCALAR REFERENCES
server.register(ScalarApiReference, {
  routePrefix: "/reference",
  configuration: {
    title: "Library Management API",
    description: "Complete API documentation for Library Management System",
    version: "1.0.0",
    theme: {
      primaryColor: "#2563eb",
    },
    defaultLayout: "modern",
    navigation: [
      {
        label: "Home",
        items: {
          label: "Entrypoint",
          path: "/"
        }
      },
      {
        label: "Authentication",
        items: [
          { label: "Register", path: "/register" },
          { label: "Login", path: "/login" },
        ],
      },
      {
        label: "Books",
        items: [
          { label: "Get All Books", path: "/books" },
          { label: "Get Book by ID", path: "/books/{id}" },
          { label: "Create Book", path: "/books" },
          { label: "Update Book", path: "/books/{id}" },
          { label: "Delete Book", path: "/books/{id}" },
        ],
      },
      {
        label: "Lendings",
        items: [
          { label: "Get Lending History", path: "/lendings" },
          { label: "Borrow Book", path: "/lendings/{bookId}" },
          { label: "Return Book", path: "/lendings/{id}/return" },
        ],
      },
      {
        label: "Analytics",
        items: [{ label: "Dashboard Statistics", path: "/analytics" }],
      },
    ],
  },
  hooks: {
    onRequest: function (request, reply, done) {
      done();
    },
    preHandler: function (request, reply, done) {
      done();
    },
  },
});

server.ready();

const start = async () => {
  try {
    await server.listen({
      port: process.env.PORT ? +process.env.PORT : 3000,
      host: "0.0.0.0",
    });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
