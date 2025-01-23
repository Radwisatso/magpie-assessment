import { z } from "zod";



export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().min(1, "ISBN is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  categoryId: z.number().int().min(1, "Category ID is required"),
  createdBy: z.number().int().min(1, "Created By is required"),
});


