import { SchemaApi } from ".";

export const registerSchemaAPI: SchemaApi = {
  schema: {
    tags: ["Auth"],
    description: "Register a new user",
    body: {
      type: "object",
      required: ["name", "email", "password", "role", "status"],
      properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 },
        role: {
          type: "string",
          enum: ["ADMIN", "MEMBER"],
          description: "User role",
        },
        phone: { type: "string" },
        status: {
          type: "string",
          enum: ["ACTIVE", "INACTIVE"],
          description: "Member status",
        },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          statusCode: { type: "number" },
          message: { type: "string" },
          data: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              email: { type: "string" },
              role: {
                type: "string",
                enum: ["ADMIN", "MEMBER"],
              },
              phone: { type: "string" },
              status: {
                type: "string",
                enum: ["ACTIVE", "INACTIVE"],
              },
            },
          },
        },
      },
    },
  },
};
