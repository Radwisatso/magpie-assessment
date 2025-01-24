import { SchemaApi } from ".";

export const getLendingsSchemaAPI: SchemaApi = {
  schema: {
    tags: ["Lendings"],
    description: "Get user's lending history",
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
                bookId: { type: "number" },
                memberId: { type: "number" },
                borrowedDate: { type: "string", format: "date-time" },
                dueDate: { type: "string", format: "date-time" },
                returnDate: { type: "string", format: "date-time", nullable: true },
                status: { type: "string", enum: ["BORROWED", "RETURNED"] },
                createdBy: { type: "number" },
                book: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    title: { type: "string" },
                    author: { type: "string" },
                    isbn: { type: "string" },
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const createLendingSchemaAPI: SchemaApi  = {
  schema: {
    tags: ["Lendings"],
    description: "Borrow a book",
    security: [{ bearerAuth: [] }],
    params: {
      type: "object",
      properties: {
        bookId: { type: "string" }
      }
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
              bookId: { type: "number" },
              memberId: { type: "number" },
              borrowedDate: { type: "string", format: "date-time" },
              dueDate: { type: "string", format: "date-time" },
              status: { type: "string", enum: ["BORROWED"] },
              createdBy: { type: "number" }
            }
          }
        }
      }
    }
  }
};

export const returnBookSchemaAPI: SchemaApi = {
  schema: {
    tags: ["Lendings"],
    description: "Return a borrowed book",
    security: [{ bearerAuth: [] }],
    params: {
      type: "object",
      properties: {
        id: { type: "string" }
      }
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
              bookId: { type: "number" },
              memberId: { type: "number" },
              borrowedDate: { type: "string", format: "date-time" },
              dueDate: { type: "string", format: "date-time" },
              returnDate: { type: "string", format: "date-time" },
              status: { type: "string", enum: ["RETURNED"] },
              createdBy: { type: "number" }
            }
          }
        }
      }
    }
  }
};