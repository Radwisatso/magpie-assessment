"use server";
import { redirect } from "next/navigation";
import z from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, { message: "Minimum password 6 characters" }),
});

export async function register(
  prevState: { errors?: Record<string, string[]> },
  formData: FormData
) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const phone = formData.get("phone");
  const role = "ADMIN";
  const status = "ACTIVE";

  const validatedFields = schema.safeParse({
    name,
    email,
    password
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${process.env.BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      phone,
      role,
      status,
    }),
  });

  const json = await response.json();
  if (json.statusCode !== 201) {
    return {
      message: "Something error",
    };
  }

  redirect("/login");
}
