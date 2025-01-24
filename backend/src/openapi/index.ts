import { FastifySchema } from "fastify";

export * from "./register";
export * from "./login";
export * from "./books";
export * from "./lendings";
export * from "./analytics";

export type SchemaApi = { schema: FastifySchema };
