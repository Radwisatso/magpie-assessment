import { requestContext } from "@fastify/request-context";

declare module "@fastify/request-context" {
  interface RequestContextData {
    user: {
      id: number;
      email: string;
      iat: number;
    } | null;
  }
}
