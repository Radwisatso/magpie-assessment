export const getCategoriesSchemaAPI = {
  schema: {
    tags: ["Books"],
    description: "Get all available book categories",
    response: {
      200: {
        type: "object",
        properties: {
          statusCode: { type: "number" },
          message: { type: "string" },
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};
