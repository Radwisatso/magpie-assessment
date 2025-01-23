import { bookSchema, userLoginSchema, userRegistrationSchema } from "./schemas";
import { PrismaClient } from "@prisma/client";
import Fastify, { FastifyInstance } from "fastify";
import fastifyRequestContext from "@fastify/request-context";
import fastifyFormBody from "@fastify/formbody";
import fastifyMiddie from "@fastify/middie";
import z from "zod";
import { comparePassword, hashPassword } from "../utils/hash";
import { signToken } from "../utils/jwt";
import { authentication } from "./middlewares/authentication";

const prisma = new PrismaClient();

const server: FastifyInstance = Fastify({});

server.register(fastifyFormBody);
server.register(fastifyMiddie);
server.register(fastifyRequestContext);
server.use("/books", authentication)
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
