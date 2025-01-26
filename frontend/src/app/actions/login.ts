"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import z from "zod";

export async function login(
  prevState: { message: string },
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");

  //   const schema = z.object({
  //     email: z.string().email(),
  //     password: z.string().min(6),
  //   });

  //   const result = schema.safeParse({
  //     email,
  //     password,
  //   });

  //   if (!result.success) {
  //     console.log(result.error.flatten().fieldErrors);
  //     return {
  //       errors: result.error.flatten().fieldErrors,
  //     };
  //   }

  const response = await fetch(`${process.env.BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const json = await response.json();
  if (json.statusCode !== 200) {
    return {
      message: "Invalid credentials",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("token", json.data.token);
  redirect("/books")
}
