import jwt from "jsonwebtoken";

const secretKey = "SECRET";

export interface JwtPayload {
  id: number;
  email: string;
}

export interface JwtPayloadVerified extends JwtPayload {
    iat: number
}

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, secretKey);
}

export function verifyToken(token: string) {
  return jwt.verify(token, secretKey);
}
