import { SchemaApi } from ".";

export const analyticsSchemaAPI: SchemaApi = {
  schema: {
    tags: ["Analytics"],
    description: "Get library analytics and statistics",
    security: [{ bearerAuth: [] }],
    response: {
      200: {
        type: "object",
        properties: {
          statusCode: { type: "number" },
          message: { type: "string" },
          data: {
            type: "object",
            properties: {
              totalBooks: { type: "number", description: "Total number of books in library" },
              totalLendings: { type: "number", description: "Total number of lending transactions" },
              activeLendings: { type: "number", description: "Number of currently borrowed books" },
              overdueLendings: { type: "number", description: "Number of overdue books" }
            }
          }
        }
      }
    }
  }
};