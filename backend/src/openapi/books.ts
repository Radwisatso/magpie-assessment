import { SchemaApi } from ".";

export const getBooksSchemaAPI: SchemaApi = {
  schema: {
    tags: ["Books"],
    description: "Get all books",
    security: [{ bearerAuth: [] }],
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
                title: { type: "string" },
                author: { type: "string" },
                isbn: { type: "string" },
                quantity: { type: "number" },
                categoryId: { type: "number" },
                createdBy: { type: "number" },
                category: {
                  type: "object",
                  properties: {
                    id: {
                      type: "number",
                    },
                    name: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const getBookByIdSchemaAPI: SchemaApi = {
  schema: {
    tags: ["Books"],
    description: "Get book by ID",
    security: [{ bearerAuth: [] }],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
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
              id: { type: "number" },
              title: { type: "string" },
              author: { type: "string" },
              isbn: { type: "string" },
              quantity: { type: "number" },
              categoryId: { type: "number" },
              createdBy: { type: "number" },
              category: {
                type: "object",
                properties: {
                  id: {
                    type: "number",
                  },
                  name: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const createBookSchemaAPI: SchemaApi = {
  schema: {
    tags: ["Books"],
    description: "Create a new book",
    security: [{ bearerAuth: [] }],
    body: {
      type: "object",
      properties: {
        title: { type: "string" },
        author: { type: "string" },
        isbn: { type: "string" },
        quantity: { type: "number", minimum: 1 },
        categoryId: { type: "number" },
      },
      required: ["title", "author", "isbn", "quantity", "categoryId"],
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
              title: { type: "string" },
              author: { type: "string" },
              isbn: { type: "string" },
              quantity: { type: "number" },
              categoryId: { type: "number" },
              createdBy: { type: "number" },
            },
          },
        },
      },
    },
  },
};

export const updateBookSchemaAPI: SchemaApi = {
  schema: {
    tags: ["Books"],
    description: "Update a book",
    security: [{ bearerAuth: [] }],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    body: {
      type: "object",
      properties: {
        title: { type: "string" },
        author: { type: "string" },
        isbn: { type: "string" },
        quantity: { type: "number", minimum: 1 },
        categoryId: { type: "number" },
      },
      required: ["title", "author", "isbn", "quantity", "categoryId"],
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
              id: { type: "number" },
              title: { type: "string" },
              author: { type: "string" },
              isbn: { type: "string" },
              quantity: { type: "number" },
              categoryId: { type: "number" },
              createdBy: { type: "number" },
            },
          },
        },
      },
    },
  },
};

export const deleteBookSchemaAPI: SchemaApi = {
  schema: {
    tags: ["Books"],
    description: "Delete a book",
    security: [{ bearerAuth: [] }],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          statusCode: { type: "number" },
          message: { type: "string" },
        },
      },
    },
  },
};
