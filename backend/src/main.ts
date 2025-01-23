import { PrismaClient } from "@prisma/client";
import { error } from "console";
import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import fastifyFormBody from "@fastify/formbody";
import z from "zod";
import { bookSchema } from "./schemas";

const prisma = new PrismaClient();

const server: FastifyInstance = Fastify({});

// application/x-www-form-urlencoded parser
server.register(fastifyFormBody);

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

// ** BOOKS API

// GET BOOKS
server.get("/books", async (request, reply) => {
  const books = await prisma.book.findMany();
  reply.code(200).send({
    statusCode: 200,
    message: "Successfully fetch books",
    data: books,
  });
});

// CREATE A BOOK
server.post("/books", async (request, reply) => {
  const parsedBody = bookSchema.parse(request.body);
  const { title, author, isbn, quantity, categoryId, createdBy } = parsedBody;
  const newBook = await prisma.book.create({
    data: {
      title,
      author,
      isbn,
      quantity,
      categoryId,
      createdBy,
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

// ** ERROR HANDLER
server.setErrorHandler((error, request, reply) => {
  if (error instanceof z.ZodError) {
    return reply.status(400).send({
      statusCode: 400,
      message: "Validation Errors",
      errors: error.errors,
    });
  }
  reply.status(500).send(error);
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
