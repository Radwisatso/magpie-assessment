import { bookSchema, userLoginSchema, userRegistrationSchema } from "./schemas";
import { PrismaClient } from "@prisma/client";
import Fastify, { FastifyInstance } from "fastify";
import fastifyFormBody from "@fastify/formbody";
import z from "zod";
import { comparePassword, hashPassword } from "../utils/hash";
import { signToken, verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { addDays } from "date-fns";

declare module "fastify" {
  interface FastifyRequest {
    user: JwtPayload | null;
  }
}

const prisma = new PrismaClient();

const server: FastifyInstance = Fastify({});
server.decorateRequest("user", null);
server.register(fastifyFormBody);
// REGISTER
server.post("/register", async (request, reply) => {
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

// LOGIN
server.post("/login", async (request, reply) => {
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

// ** BOOKS API

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
  // GET BOOKS
  childServer.get("/books", async (request, reply) => {
    const books = await prisma.book.findMany();
    reply.code(200).send({
      statusCode: 200,
      message: "Successfully fetch books",
      data: books,
    });
  });
  // GET BOOK BY ID
  childServer.get("/books/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!book) {
      throw { statusCode: 404, message: "Book not found" };
    }
    reply.code(200).send({
      statusCode: 200,
      message: "Successfully fetch book",
      data: book,
    });
  });
  // CREATE BOOK
  childServer.post("/books", async (request, reply) => {
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
  childServer.put("/books/:id", async (request, reply) => {
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
    if (book.createdBy !== request.user.id) {
      throw { statusCode: 403, message: "Forbidden" };
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
  childServer.delete("/books/:id", async (request, reply) => {
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
    await prisma.bookStatus.delete({
      where: {
        id: parseInt(id),
      },
      include: {
        book: true,
      },
    });
    reply.status(200).send({
      statusCode: 200,
      message: "Successfully deleted a book",
    });
  });
  // LENDINGS
  childServer.post("/lendings/:bookId", async (request, reply) => {
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
    const lendingTransaction = await prisma.$transaction(async (tx) => {
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
    });

    reply.status(201).send({
      statusCode: 201,
      message: "Successfully borrowed a book",
      data: lendingTransaction,
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

const start = async () => {
  try {
    await server.listen({ port: 3000 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
