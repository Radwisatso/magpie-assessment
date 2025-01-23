import { NextFunction } from "connect";
import { IncomingMessage, ServerResponse } from "http";
import { JwtPayloadVerified, verifyToken } from "../../utils/jwt";
import { FastifyRequest } from "fastify";

export async function authentication(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw { statusCode: 401, message: "Unauthorized" };
  }

  let token = authorization.split(" ")[1];

  const server = (req as unknown as FastifyRequest).server;

  let decoded = verifyToken(token) as JwtPayloadVerified;
  console.log(decoded);
  server.requestContext.set("user", decoded);

  next();
}
