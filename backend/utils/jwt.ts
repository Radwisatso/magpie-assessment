import jwt from "jsonwebtoken";

const secretKey = "SECRET";

interface JwtPayload {
  id: number;
  email: string;
}

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, secretKey);
}

export function verifyToken(token: string) {
  return jwt.verify(token, secretKey);
}
