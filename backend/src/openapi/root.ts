import { SchemaApi } from ".";

export const rootSchemaAPI: SchemaApi = {
    schema: {
      tags: ["Public"],
      summary: "Welcome endpoint",
      description: "Returns welcome message and API documentation link",
      response: {
        200: {
          type: "object",
          properties: {
            statusCode: { type: "number" },
            message: { type: "string" }
          }
        }
      }
    }
  };