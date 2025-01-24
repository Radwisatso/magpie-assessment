import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().min(1, "ISBN is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  categoryId: z.number().int().min(1, "Category ID is required"),
});

export const userRegistrationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(128, { message: "Password must not exceed 128 characters" }),
  role: z.enum(["ADMIN", "MEMBER"], {
    message: "Role must be one of 'ADMIN' or 'MEMBER'",
  }),
  phone: z
    .string()
    .regex(/^[0-9]+$/, { message: "Phone number must only contain digits" })
    .optional(),
  status: z.enum(["ACTIVE", "INACTIVE"], {
    message: "Status must be either 'ACTIVE' or 'INACTIVE'",
  }),
});

export const userLoginSchema = z.object({
  email: z.string({
    message: "Unauthorized",
  }),
  password: z.string({
    message: "Unauthorized",
  }),
});
