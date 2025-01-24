import { SchemaApi } from ".";

export const loginSchemaAPI: SchemaApi = {
  schema: {
    tags: ["Auth"],
    description: "Login user",
    body: {
      type: "object",
      properties: {
        email: { type: "string", format: "email" },
        password: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          statusCode: { type: "number" },
          message: { type: "string" },
          data: {
            type: "object",
            properties: {
              token: { type: "string" },
            },
          },
        },
      },
    },
  },
};